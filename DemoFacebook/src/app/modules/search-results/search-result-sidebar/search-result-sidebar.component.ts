import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-result-sidebar',
  templateUrl: './search-result-sidebar.component.html',
  styleUrls: ['./search-result-sidebar.component.scss']
})
export class SearchResultSidebarComponent implements OnInit {

  constructor() { }
  @Input('searchBox') searchBox :any;

  ngOnInit(): void {
  }

}
