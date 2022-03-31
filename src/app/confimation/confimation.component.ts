import { Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-confimation',
  templateUrl: './confimation.component.html',
  styleUrls: ['./confimation.component.css'],
})
export class ConfimationComponent implements OnInit, AfterViewInit {
  @Output() public delete: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() public row: HTMLElement;

  public constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  public ngAfterViewInit(): void {
    
  }

  public ngOnInit(): void {
    const style = getComputedStyle(this.row);
    const width = style.width;
    const height = style.height;

    this.renderer.setStyle(this.elementRef.nativeElement, 'width', width);
    this.renderer.setStyle(this.elementRef.nativeElement, 'height', height);

    this.renderer.setStyle(this.row, 'opacity' , 0.5);
  }

  public remove(): void {
    this.delete.emit(true);
    this.renderer.setStyle(this.row, 'opacity' , 1);
  }

  public cancel(): void {
    this.delete.emit(false);
    this.renderer.setStyle(this.row, 'opacity' , 1);
  }
}
