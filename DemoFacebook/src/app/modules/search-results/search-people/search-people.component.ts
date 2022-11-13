import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
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
  destroy$ : Subject<void> = new Subject<void>();

  ngOnInit(): void {

    this.friendship.serchbox.pipe(debounceTime(300),distinctUntilChanged(),takeUntil(this.destroy$)).subscribe(res=>{
      this.getallsearchUser(res)
    })
  }

  userdata:any;
  getallsearchUser(search:any){
    this.friendship.serchUsers(search).pipe(debounceTime(300),distinctUntilChanged()).subscribe(data=>{
      this.userdata=data;
      this.Loader=false;
      
    },err=>{
      console.log(err);
    })
  }

  ngOnDestroy(){
    this.destroy$.next();
  }
  
}
