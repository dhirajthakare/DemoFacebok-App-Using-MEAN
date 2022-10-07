import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplayPostComponent } from './display-post.component';
import { UpdatePostDialogComponent } from './update-post-dialog/update-post-dialog.component';
import { LikeUserDialogComponent } from './like-user-dialog/like-user-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { PickerModule } from '@ctrl/ngx-emoji-mart';


@NgModule({
  declarations: [
    DisplayPostComponent,
    UpdatePostDialogComponent,
    LikeUserDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    PickerModule
    ],
    exports:[
      DisplayPostComponent
    ]
})
export class DisplayPostModule { }
