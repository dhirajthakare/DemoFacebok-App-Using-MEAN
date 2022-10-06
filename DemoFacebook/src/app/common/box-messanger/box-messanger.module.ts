import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoxMessangerRoutingModule } from './box-messanger-routing.module';
import { BoxMessangerComponent } from './box-messanger.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    BoxMessangerComponent
  ],
  imports: [
    CommonModule,
    BoxMessangerRoutingModule,
    FormsModule,
    MatDialogModule
  ]
})
export class BoxMessangerModule { }
