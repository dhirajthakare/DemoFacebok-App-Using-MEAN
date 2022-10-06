import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FriendService } from 'src/app/common/services/friend.service';

@Component({
  selector: 'app-search-people',
  templateUrl: './search-people.component.html',
  styleUrls: ['./search-people.component.scss']
})
export class SearchPeopleComponent implements OnInit {

  constructor(

    private friendship : FriendService 
  ) { }

  Loader:boolean =  true;

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
      this.Loader=false;
      
    },err=>{
      console.log(err);
    })
      
  }


}
