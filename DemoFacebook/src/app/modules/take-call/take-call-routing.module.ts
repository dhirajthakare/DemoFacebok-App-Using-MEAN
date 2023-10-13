import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TakeCallComponent } from './take-call.component';

const routes: Routes = [{ path: '', component: TakeCallComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TakeCallRoutingModule { }
