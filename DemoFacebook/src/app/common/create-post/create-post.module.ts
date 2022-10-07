import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePostRoutingModule } from './create-post-routing.module';
import { CreatePostComponent } from './create-post.component';
import { CreatePostDialogComponent } from './create-post-dialog/create-post-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { PickerModule } from '@ctrl/ngx-emoji-mart';


@NgModule({
  declarations: [
    CreatePostComponent,
    CreatePostDialogComponent
  ],
  imports: [
    CommonModule,
    CreatePostRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    PickerModule
  ],
  exports:[
    CreatePostComponent
  ]
})
export class CreatePostModule { }