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

    this.friendship.searchBox.pipe(debounceTime(300),distinctUntilChanged(),takeUntil(this.destroy$)).subscribe(res=>{
      this.getAllSearchUser(res)
    })
  }

  userData:any;
  getAllSearchUser(search:any){
    this.friendship.searchUsers(search).pipe(debounceTime(300),distinctUntilChanged()).subscribe(data=>{
      this.userData=data;
      this.Loader=false;
      
    },err=>{
      console.log(err);
    })
  }

  ngOnDestroy(){
    this.destroy$.next();
  }
  
}
