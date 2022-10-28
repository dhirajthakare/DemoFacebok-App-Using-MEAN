import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginCardRoutingModule } from './login-card-routing.module';
import { LoginCardComponent } from './login-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DbContentComponent } from './db-content/db-content.component';


@NgModule({
  declarations: [
    LoginCardComponent,
    DbContentComponent
  ],
  imports: [
    CommonModule,
    LoginCardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ],
  exports:[
    LoginCardComponent,
    DbContentComponent
  ]
})
export class LoginCardModule { }
