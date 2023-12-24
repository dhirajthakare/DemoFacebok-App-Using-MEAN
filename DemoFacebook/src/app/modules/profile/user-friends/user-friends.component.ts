import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SharedDataService } from 'src/app/common/services/shared-data.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.scss']
})
export class UserFriendsComponent implements OnInit {

  constructor(
    private userService:UserService,
    private sharedService:SharedDataService
  ) { }

  loginUserDetails:any;
  currentVisitedUserDetails:any
  destroy$:Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.sharedService.changeTitle('DeskBook | friends');
    this.loginUser();
    this.getCurrentVisitedUser();
  }

    loginUser(){
      this.userService.currentLoginUser.pipe(takeUntil(this.destroy$)).subscribe( (res: any) =>{
        if(res){
        this.loginUserDetails=res;
        }
      });
    }
    getCurrentVisitedUser(){

    this.userService.currentVisitedUser.pipe(takeUntil(this.destroy$)).subscribe((res: any)=>{
      if(res){
        this.currentVisitedUserDetails = res;
      }
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

}
