import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <search-cmp>
      <ng-container class="search-result">
        <div style="border: 1px solid red">
          hello
        </div>
      </ng-container>
    </search-cmp>
  `
})
export class AppComponent {}
