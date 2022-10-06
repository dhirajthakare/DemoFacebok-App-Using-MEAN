import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateStoriesComponent } from './create-stories/create-stories.component';
import { StoriesComponent } from './stories.component';

const routes: Routes = [{ path: '', component: StoriesComponent ,children:[
  {path:'create',component:CreateStoriesComponent}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoriesRoutingModule { }
