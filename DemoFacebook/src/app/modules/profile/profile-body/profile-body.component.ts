import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { FriendService } from 'src/app/common/services/friend.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-profile-body',
  templateUrl: './profile-body.component.html',
  styleUrls: ['./profile-body.component.scss']
})
export class ProfileBodyComponent implements OnInit {

  
  constructor(
    private userService: UserService,
    private toastService: ToastrService,
    private friend: FriendService
  ) { }

  preLoader = false;
  loginUserDetails: any;

  @ViewChild('submitBtn')
  submitBtn!: ElementRef<HTMLElement>;

  currentVisitedUserDetails: any;
  friendsId: any = [];
  currentVisitedUserFriends: any;
  
  friends: any;
  AllCurrentUserPost: any;
  destroy$:Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.getLoginUser();
    this.getAllFriendsId();
  }

  getLoginUser(){
    this.userService.currentLoginUser.pipe(takeUntil(this.destroy$)).subscribe( (res: any) =>{
      if(res){
        this.loginUserDetails = res;
        this.getCurrentVisitedUser();
      }
    });
  }


  getCurrentVisitedUser() {

    this.userService.currentVisitedUser.pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      if(res){
      this.currentVisitedUserDetails = res;
      if (this.currentVisitedUserDetails.user_Friends) {
        this.currentVisitedUserFriends = this.currentVisitedUserDetails.user_Friends.filter((value: any, index: number) => {
          return index <= 8;
        })
      }
      this.getpost();
      }

    })
  }


  sendRequest(uid: any, fid: any) {
    this.friend.sendRequest(uid, fid).subscribe(res => {
      this.toastService.success('Request send successfully');
    }, err => {
      console.log(err);
    })
  }

  getAllFriendsId() {

    this.friend.userLoginFriendsId.pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.friendsId = res;
    })

  }
  
  getpost() {
    this.userService.getCurrentUserPost(this.currentVisitedUserDetails._id, this.loginUserDetails._id).subscribe((res: any) => {

      if(res){
        this.AllCurrentUserPost = res.filter((value: any, index: number) => {
          return index <= 8;
        })
      }
    })

  }

  ngOnDestroy() {
    this.destroy$.next();
  }

}
