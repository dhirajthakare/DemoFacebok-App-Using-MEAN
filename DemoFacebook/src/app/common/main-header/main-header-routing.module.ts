import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainHeaderComponent } from './main-header.component';

const routes: Routes = [{ path: '', component: MainHeaderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainHeaderRoutingModule { }
