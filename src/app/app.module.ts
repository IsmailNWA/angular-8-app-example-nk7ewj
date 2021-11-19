import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CdkStepperModule } from '@angular/cdk/stepper/typings/stepper-module';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, CdkStepperModule],
  bootstrap: [AppComponent],
  declarations: [AppComponent],
})
export class AppModule {}
