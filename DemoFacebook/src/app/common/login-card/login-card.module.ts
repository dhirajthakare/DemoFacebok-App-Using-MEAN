import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginCardRoutingModule } from './login-card-routing.module';
import { LoginCardComponent } from './login-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    LoginCardComponent
  ],
  imports: [
    CommonModule,
    LoginCardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ],
  exports:[
    LoginCardComponent
  ]
})
export class LoginCardModule { }
