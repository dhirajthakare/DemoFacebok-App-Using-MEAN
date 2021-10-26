import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-result-sidebar',
  templateUrl: './search-result-sidebar.component.html',
  styleUrls: ['./search-result-sidebar.component.css']
})
export class SearchResultSidebarComponent implements OnInit {

  constructor() { }

  @Input('searchbox') searchbox :any;
  ngOnInit(): void {
  }

}
