import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TakeCallRoutingModule } from './take-call-routing.module';
import { TakeCallComponent } from './take-call.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TakeCallComponent
  ],
  imports: [
    CommonModule,
    TakeCallRoutingModule,
    FormsModule
  ]
})
export class TakeCallModule { }
