import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceptCallComponent } from './accept-call.component';

const routes: Routes = [{ path: '', component: AcceptCallComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcceptCallRoutingModule { }
