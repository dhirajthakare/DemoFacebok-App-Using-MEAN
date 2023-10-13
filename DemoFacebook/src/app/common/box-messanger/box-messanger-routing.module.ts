import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoxMessangerComponent } from './box-messanger.component';

const routes: Routes = [{ path: '', component: BoxMessangerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoxMessangerRoutingModule { }
