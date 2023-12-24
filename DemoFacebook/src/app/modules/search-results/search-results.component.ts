import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FriendService } from 'src/app/common/services/friend.service';
import { SharedDataService } from 'src/app/common/services/shared-data.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  
  constructor(
    private router:ActivatedRoute,
    private friendship : FriendService,
    private sharedService:SharedDataService
  
    ) { }
    searchBox:any;
    ngOnInit(): void {
      this.sharedService.changeTitle('DeskBook | Search');
  
      this.router.queryParams.subscribe(res=>{
        if(res){
        this.searchBox = res;
        this.searchBox = this.searchBox.q;
        if(this.searchBox){
          this.friendship.searchBox.next(this.searchBox);
        }
        }
  
      })
    }

}
