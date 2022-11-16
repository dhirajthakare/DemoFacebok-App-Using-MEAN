import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplayPostComponent } from './display-post.component';
import { UpdatePostDialogComponent } from './update-post-dialog/update-post-dialog.component';
import { LikeUserDialogComponent } from './like-user-dialog/like-user-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { RouterModule } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [
    DisplayPostComponent,
    UpdatePostDialogComponent,
    LikeUserDialogComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    PickerModule,
    ImageCropperModule
    ],
    exports:[
      DisplayPostComponent
    ]
})
export class DisplayPostModule { }
