import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResultsRoutingModule } from './search-results-routing.module';
import { SearchResultsComponent } from './search-results.component';
import { SearchResultSidebarComponent } from './search-result-sidebar/search-result-sidebar.component';
import { SearchPostComponent } from './search-post/search-post.component';
import { SearchPeopleComponent } from './search-people/search-people.component';
import { AllSearchResultComponent } from './all-search-result/all-search-result.component';
import { MainHeaderModule } from 'src/app/common/main-header/main-header.module';


@NgModule({
  declarations: [
    SearchResultsComponent,
    SearchResultSidebarComponent,
    SearchPostComponent,
    SearchPeopleComponent,
    AllSearchResultComponent
  ],
  imports: [
    CommonModule,
    SearchResultsRoutingModule,
    MainHeaderModule
  ]
})
export class SearchResultsModule { }
