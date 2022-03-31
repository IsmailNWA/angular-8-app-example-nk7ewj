import { Observable } from 'rxjs';
import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  AfterViewInit,
  ElementRef,
  ComponentRef,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

import { Product } from './model';
import { map } from 'rxjs/operators';
import { EditService } from './edit.service';
import { GridComponent } from '@progress/kendo-angular-grid/dist/es2015/main';
import {
  OverlayRef,
  Overlay,
  OverlayPositionBuilder,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ConfimationComponent } from './confimation/confimation.component';

@Component({
  selector: 'my-app',
  template: `
        <kendo-grid
        #kendoGrid
        [data]="view | async"
        [height]="533"
        [pageSize]="gridState.take" [skip]="gridState.skip" [sort]="gridState.sort"
        [pageable]="true" [sortable]="true"
        (dataStateChange)="onStateChange($event)"
        (edit)="editHandler($event)" (cancel)="cancelHandler($event)"
        (save)="saveHandler($event)" (remove)="removeHandler($event)"
        (add)="addHandler($event, myForm)"
        [navigable]="true"
        >
        <ng-template kendoGridToolbarTemplate>
            <button kendoGridAddCommand type="button">Add new</button>
        </ng-template>
        <kendo-grid-column field="ProductName" title="Product Name">
            <ng-template kendoGridEditTemplate let-dataItem="dataItem">
                <input [(ngModel)]="dataItem.ProductName" kendoGridFocusable name="ProductName" class="k-textbox k-input k-rounded-md" required/>
            </ng-template>
        </kendo-grid-column>
        <kendo-grid-column field="UnitPrice" editor="numeric" title="Price">
            <ng-template kendoGridEditTemplate let-dataItem="dataItem">
                <input [(ngModel)]="dataItem.UnitPrice" kendoGridFocusable name="UnitPrice" class="k-textbox k-input k-rounded-md" type="number"/>
            </ng-template>
        </kendo-grid-column>
        <kendo-grid-column field="Discontinued" editor="boolean" title="Discontinued">
            <ng-template kendoGridEditTemplate let-dataItem="dataItem">
                <input [(ngModel)]="dataItem.Discontinued" kendoGridFocusable name="Discontinued" type="checkbox"/>
            </ng-template>
        </kendo-grid-column>
        <kendo-grid-column field="UnitsInStock" editor="numeric" title="Units In Stock">
            <ng-template kendoGridEditTemplate let-dataItem="dataItem">
                <input
                    [(ngModel)]="dataItem.UnitsInStock"
                    kendoGridFocusable
                    name="UnitsInStock"
                    required
                    min="0"
                    max="99"
                    class="k-textbox k-input k-rounded-md"
                    type="number"/>
            </ng-template>
        </kendo-grid-column>
        <kendo-grid-command-column title="command" width="220">
            <ng-template kendoGridCellTemplate let-isNew="isNew">
                <button kendoGridEditCommand type="button" [primary]="true">Edit</button>
                <button kendoGridRemoveCommand type="button">Remove</button>
                <button
                    kendoGridSaveCommand type="button">{{ isNew ? 'Add' : 'Update' }}</button>
                <button kendoGridCancelCommand type="button">{{ isNew ? 'Discard changes' : 'Cancel' }}</button>
            </ng-template>
        </kendo-grid-command-column>
        </kendo-grid>
  `,
})
export class AppComponent implements OnInit, AfterViewInit {
  public view: Observable<GridDataResult>;
  @ViewChild('kendoGrid', { static: true }) kendoGrid: GridComponent;
  @ViewChild('kendoGrid', { static: true, read: ElementRef })
  kendoGridElement: ElementRef<HTMLElement>;

  private overlayRef: OverlayRef;

  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10,
  };

  private editService: EditService;
  private editedRowIndex: number;
  private editedProduct: Product;

  constructor(
    @Inject(EditService) editServiceFactory: any,
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder
  ) {
    this.editService = editServiceFactory();
  }

  public ngOnInit(): void {
    this.view = this.editService.pipe(
      map((data) => process(data, this.gridState))
    );

    this.editService.read();
    this.overlayRef = this.overlay.create();
  }

  public ngAfterViewInit(): void {
    console.log(this.kendoGrid);
  }

  public onStateChange(state: State) {
    this.gridState = state;

    this.editService.read();
  }

  public addHandler({ sender }, formInstance) {
    formInstance.reset();
    this.closeEditor(sender);

    sender.addRow(new Product());
  }

  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);

    this.editedRowIndex = rowIndex;
    this.editedProduct = Object.assign({}, dataItem);

    sender.editRow(rowIndex);
  }

  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({ sender, rowIndex, dataItem, isNew }) {
    this.editService.save(dataItem, isNew);

    sender.closeRow(rowIndex);

    this.editedRowIndex = undefined;
    this.editedProduct = undefined;
  }

  public removeHandler({ rowIndex, dataItem }) {
    const rowElement = this.kendoGridElement.nativeElement.querySelector(
      'table tbody tr:nth-child(' + (rowIndex + 1) + ')'
    );

    this.overlayRef.updatePositionStrategy(
      this.createPositionStrategy(rowElement as any)
    );

    const confirmationPortal = new ComponentPortal(ConfimationComponent);
    const confirmationRef: ComponentRef<ConfimationComponent> =
      this.overlayRef.attach(confirmationPortal);

    confirmationRef.instance.delete.subscribe((value: boolean) => {
      this.overlayRef.detach();
      if (value) {
        this.editService.remove(dataItem);
        return;
      }
    });

    confirmationRef.instance.row = rowElement as HTMLElement;
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editService.resetItem(this.editedProduct);
    this.editedRowIndex = undefined;
    this.editedProduct = undefined;
  }

  private createPositionStrategy(elementRef: ElementRef) {
    return this.overlayPositionBuilder
      .flexibleConnectedTo(elementRef)
      .withPositions([
        {
          originX: 'end',
          originY: 'center',
          overlayX: 'end',
          overlayY: 'center',
        },
      ]);
  }
}
