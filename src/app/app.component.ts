import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <search-cmp>
      <div class="serach-result" #result style="border: 1px solid red">
        hello
      </div>
    </search-cmp>
  `,
})
export class AppComponent {}
