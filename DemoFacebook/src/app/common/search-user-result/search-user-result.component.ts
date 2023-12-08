import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, Subscription, takeUntil } from 'rxjs';
import { FriendService } from '../services/friend.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-search-user-result',
  templateUrl: './search-user-result.component.html',
  styleUrls: ['./search-user-result.component.scss'],
})
export class SearchUserResultComponent implements OnInit {
  data: any;
  searchBox: any;
  userData: any;
  displayBtn: boolean = false;
  totalLength: any;

  searchForm: any;

  ngOnDestroy$ : Subject<void> = new Subject<void>();

  constructor(
    private friendship: FriendService
  ) {}

  ngAfterViewInit() {}

  ngOnInit(): void {
    this.getSearchUserData();
    this.searchBoxVisibilityCheck();
  }


  getSearchUserData() {
     this.friendship.searchBox
      .pipe(debounceTime(400), distinctUntilChanged() , takeUntil(this.ngOnDestroy$))
      .subscribe((res) => {
        this.searchBox = res;
        this.friendship.searchUsers(this.searchBox).subscribe(
          (data) => {
            if(data){
              this.userData = data;
              this.totalLength = this.userData.length;
  
              this.userData = data.filter((value: any, index: any) => {
                return index <= 2;
              });
            }else{
              this.userData = null;
              this.totalLength = 0;
            }
          },
          (err) => {
            this.userData = null;
            console.log(err);
          }
        );
      });
  }

  searchBoxVisibilityCheck() {
    this.friendship.searchBoxVisibility.pipe(takeUntil(this.ngOnDestroy$)).subscribe((res: any) => {
      this.displayBtn = res;
    });
  }

  ngOnChanges() {}

  ngOnDestroy(){
    this.ngOnDestroy$.next();
  }
}
