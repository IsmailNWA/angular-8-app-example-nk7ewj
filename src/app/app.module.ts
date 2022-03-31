import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClient,
  HttpClientModule,
  HttpClientJsonpModule,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { GridModule } from '@progress/kendo-angular-grid';

import { AppComponent } from './app.component';
import { EditService } from './edit.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { ConfimationComponent } from './confimation/confimation.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@NgModule({
  declarations: [AppComponent, ConfimationComponent],
  entryComponents: [ConfimationComponent],
  imports: [
    HttpClientModule,
    HttpClientJsonpModule,
    ButtonsModule,
    BrowserAnimationsModule,
    FormsModule,
    GridModule,
    OverlayModule,
  ],
  providers: [
    {
      deps: [HttpClient],
      provide: EditService,
      useFactory: (jsonp: HttpClient) => () => new EditService(jsonp),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
