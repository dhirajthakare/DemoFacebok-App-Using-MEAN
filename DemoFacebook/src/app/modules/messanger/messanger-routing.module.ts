import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessangerMainComponent } from './messanger-main/messanger-main.component';
import { MessangerComponent } from './messanger.component';

const routes: Routes = [{ path: '', component: MessangerComponent , children:[
  {path:'' , component:MessangerMainComponent}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessangerRoutingModule { }
