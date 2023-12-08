import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessengerMainComponent } from './messenger-main/messenger-main.component';
import { MessengerComponent } from './messenger.component';

const routes: Routes = [{ path: '', component: MessengerComponent , children:[
  {path:'' , component:MessengerMainComponent}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessengerRoutingModule { }
