import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchUserResultRoutingModule } from './search-user-result-routing.module';
import { SearchUserResultComponent } from './search-user-result.component';


@NgModule({
  declarations: [
    SearchUserResultComponent
  ],
  imports: [
    CommonModule,
    SearchUserResultRoutingModule
  ],
  exports:[
    SearchUserResultComponent
  ]
})
export class SearchUserResultModule { }
