import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainHeaderRoutingModule } from './main-header-routing.module';
import { MainHeaderComponent } from './main-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateUserDialogComponent } from './update-user-dialog/update-user-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditProfileDetailsDialogComponent } from './edit-profile-details-dialog/edit-profile-details-dialog.component';


@NgModule({
  declarations: [
    MainHeaderComponent,
    UpdateUserDialogComponent,
    EditProfileDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    MainHeaderRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ],
  exports:[
    MainHeaderComponent
  ]
})
export class MainHeaderModule { }
