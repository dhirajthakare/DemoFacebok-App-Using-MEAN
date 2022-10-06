import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FriendService } from 'src/app/common/services/friend.service';

@Component({
  selector: 'app-all-search-result',
  templateUrl: './all-search-result.component.html',
  styleUrls: ['./all-search-result.component.scss']
})
export class AllSearchResultComponent implements OnInit {

  constructor(

    private friendship : FriendService
  ) { }

  ngOnInit(): void {

    this.friendship.serchbox.subscribe(res=>{
      console.log(res);
      this.getallsearchUser(res)
    })
   

  }
  userdata:any;
  getallsearchUser(search:any){
    this.friendship.serchUsers(search).pipe(debounceTime(300),distinctUntilChanged()) .subscribe(data=>{
      console.log(data);
      this.userdata=data;
      
    },err=>{
      console.log(err);
    })
      
  }

}
