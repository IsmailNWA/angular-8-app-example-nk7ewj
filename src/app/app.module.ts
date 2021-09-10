import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StyleDirective } from './style.directive';
import { SearchModule } from './search/search.module';

@NgModule({
  imports: [BrowserModule, FormsModule, SearchModule],
  declarations: [AppComponent, StyleDirective],
  bootstrap: [AppComponent]
})
export class AppModule {}
