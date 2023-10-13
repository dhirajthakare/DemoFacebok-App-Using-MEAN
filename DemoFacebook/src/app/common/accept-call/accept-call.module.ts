import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcceptCallRoutingModule } from './accept-call-routing.module';
import { AcceptCallComponent } from './accept-call.component';


@NgModule({
  declarations: [
    AcceptCallComponent
  ],
  imports: [
    CommonModule,
    AcceptCallRoutingModule
  ],
  exports:[
    AcceptCallComponent
  ]
})
export class AcceptCallModule { }
