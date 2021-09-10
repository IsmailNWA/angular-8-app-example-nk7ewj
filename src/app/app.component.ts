import {
  AfterContentInit,
  Component,
  ContentChild,
  OnInit,
  Renderer2,
  VERSION
} from '@angular/core';

@Component({
  selector: 'search-cmp',
  template: `
    <p>Search</p>
    <ng-content select=".serach-result"></ng-content>
  `
})
export class SearchComponent implements AfterContentInit {
  @ContentChild('result', { static: false }) searchResult;

  public constructor(private renderer: Renderer2) {}

  ngAfterContentInit() {
    console.log(this.searchResult);
    this.renderer.setStyle(this.searchResult.nativeElement, 'height', '100px');
  }
}

@Component({
  selector: 'my-app',
  template: `
    <search-cmp>
      <div class="serach-result" #result style="border: 1px solid red">
        hello
      </div>
    </search-cmp>
  `
})
export class AppComponent {}
