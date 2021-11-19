import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule],
  bootstrap: [AppComponent],
  declarations: [AppComponent],
})
export class AppModule {}
