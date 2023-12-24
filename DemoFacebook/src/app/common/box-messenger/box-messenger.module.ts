import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxMessengerRoutingModule } from './box-messenger-routing.module';
import { BoxMessengerComponent } from './box-messenger.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { PickerModule } from '@ctrl/ngx-emoji-mart';


@NgModule({
  declarations: [
    BoxMessengerComponent
  ],
  imports: [
    CommonModule,
    BoxMessengerRoutingModule,
    FormsModule,
    MatDialogModule,
    PickerModule
  ]
})
export class BoxMessengerModule { }
