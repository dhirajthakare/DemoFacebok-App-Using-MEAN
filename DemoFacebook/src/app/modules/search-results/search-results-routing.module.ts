import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllSearchResultComponent } from './all-search-result/all-search-result.component';
import { SearchPeopleComponent } from './search-people/search-people.component';
import { SearchPostComponent } from './search-post/search-post.component';
import { SearchResultsComponent } from './search-results.component';

const routes: Routes = [
  {path:'',component:SearchResultsComponent , children:[
    {path:'',redirectTo:'top',pathMatch:'prefix'},
    {path:'top',component:AllSearchResultComponent},
    {path:'posts',component:SearchPostComponent},
    {path:'peoples',component:SearchPeopleComponent},

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchResultsRoutingModule { }
