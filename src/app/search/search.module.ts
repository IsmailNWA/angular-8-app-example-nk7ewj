import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { StyleDirective } from '../style.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [SearchComponent, StyleDirective],
  exports: [SearchComponent, StyleDirective]
})
export class SearchModule {}
