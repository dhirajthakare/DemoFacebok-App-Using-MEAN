import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchUserResultComponent } from './search-user-result.component';

const routes: Routes = [{ path: '', component: SearchUserResultComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchUserResultRoutingModule { }
