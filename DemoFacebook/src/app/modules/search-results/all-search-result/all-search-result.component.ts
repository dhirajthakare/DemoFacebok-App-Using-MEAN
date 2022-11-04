import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-all-search-result',
  templateUrl: './all-search-result.component.html',
  styleUrls: ['./all-search-result.component.scss']
})
export class AllSearchResultComponent implements OnInit {

  constructor() { }

  destroy$ : Subject<void> = new Subject<void>();

  ngOnInit(): void {
  }

}
