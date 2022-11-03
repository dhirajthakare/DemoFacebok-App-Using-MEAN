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
  searchbox: any;
  userdata: any;
  displaybtn: boolean = false;
  totalLength: any;

  searchForm: any;

  ngonDestroy$ : Subject<void> = new Subject<void>();

  constructor(
    private friendship: FriendService
  ) {}

  ngAfterViewInit() {}

  ngOnInit(): void {
    this.getSearchUserData();
    this.searchBoxVisibilityCheck();
  }


  getSearchUserData() {
     this.friendship.serchbox
      .pipe(debounceTime(400), distinctUntilChanged() , takeUntil(this.ngonDestroy$))
      .subscribe((res) => {
        this.searchbox = res;
        this.friendship.serchUsers(this.searchbox).subscribe(
          (data) => {
            console.log(data);
            this.userdata = data;
            this.totalLength = this.userdata.length;

            this.userdata = data.filter((value: any, index: any) => {
              return index <= 2;
            });
          },
          (err) => {
            this.userdata = null;
            console.log(err);
          }
        );
      });
  }

  searchBoxVisibilityCheck() {
    this.friendship.searchBoxVisibility.pipe(takeUntil(this.ngonDestroy$)).subscribe((res: any) => {
      this.displaybtn = res;
    });
  }

  ngOnChanges() {}

  ngOnDestroy(){
    this.ngonDestroy$.next();
  }
}
