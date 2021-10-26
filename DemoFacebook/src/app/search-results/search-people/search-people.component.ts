import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FriendrelationshipService } from 'src/app/services/friendrelationship.service';

@Component({
  selector: 'app-search-people',
  templateUrl: './search-people.component.html',
  styleUrls: ['./search-people.component.css']
})
export class SearchPeopleComponent implements OnInit {

  constructor(

    private friendship : FriendrelationshipService
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
