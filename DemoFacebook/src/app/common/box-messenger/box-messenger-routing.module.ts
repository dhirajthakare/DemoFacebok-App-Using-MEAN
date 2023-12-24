import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoxMessengerComponent } from './box-messenger.component';

const routes: Routes = [{ path: '', component: BoxMessengerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoxMessengerRoutingModule { }
