import { Component } from "@angular/core";

@Component({
  selector: 'search-cmp',
  template: `
    <p>Search</p>
    <ng-content select=".search-result"></ng-content>
  `
})
export class SearchComponent {

  public constructor() {}


}