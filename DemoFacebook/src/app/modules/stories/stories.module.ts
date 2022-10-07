import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoriesRoutingModule } from './stories-routing.module';
import { StoriesComponent } from './stories.component';
import { ShowStoriesComponent } from './show-stories/show-stories.component';
import { CreateStoriesComponent } from './create-stories/create-stories.component';


@NgModule({
  declarations: [
    StoriesComponent,
    ShowStoriesComponent,
    CreateStoriesComponent
  ],
  imports: [
    CommonModule,
    StoriesRoutingModule
  ],
  exports: [
    StoriesComponent,
    ShowStoriesComponent,
    CreateStoriesComponent
  ]
})
export class StoriesModule { }