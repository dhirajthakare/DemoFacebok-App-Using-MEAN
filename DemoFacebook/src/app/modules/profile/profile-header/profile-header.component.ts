import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { BoxMessengerComponent } from 'src/app/common/box-messenger/box-messenger.component';
import { EditProfileDetailsDialogComponent } from 'src/app/common/main-header/edit-profile-details-dialog/edit-profile-details-dialog.component';
import { FriendService } from 'src/app/common/services/friend.service';
import { SharedDataService } from 'src/app/common/services/shared-data.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent implements OnInit {
  constructor(
    private userService: UserService,
    private friend: FriendService,
    private toastService: ToastrService,
    private matDia: MatDialog,
    private route:Router,
    private activeRoute:ActivatedRoute,
    private sharedService:SharedDataService
  ) {}

  loginUserDetails: any;
  CoverPhoto: any;
  CurrentVisitedUser: any;
  friendsId: any = [];
  destroy$:Subject<void> = new Subject<void>();


  ngOnInit(): void {
    this.getCurrentVisitedUserData();
    this.sharedService.editProfileSave.pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      if (res) {
        this.getCurrentVisitedUserData();
        this.sharedService.editProfileSave.next(false);
      }
    });
    this.getAllFriendsId();
    this.getCurrentLoginUser();
  }

  getCurrentVisitedUserData() {
    this.activeRoute.params.subscribe((res) => {
      let visitedUserToken = res['token'];
      if (visitedUserToken) {
        this.userService.getUser(visitedUserToken).subscribe(
          (res) => {
           if(res){
            this.CurrentVisitedUser = res;
            if (this.CurrentVisitedUser.user_info) {
              if (this.CurrentVisitedUser.user_info.CoverPhoto) {
                this.CoverPhoto =
                  'http://localhost:2000' + this.CurrentVisitedUser.user_info.CoverPhoto;
              }
            }
            this.userService.currentVisitedUser.next(res);
           }
          },
          (err) => {
            this.route.navigate(['error']);
          }
        );
      }
    });
  }

  getAllFriendsId() {
    this.friend.userLoginFriendsId.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      if(res){
        this.friendsId = res;
      }
    });
  }

  getCurrentLoginUser() {
    this.userService.currentLoginUser.pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
     if(res){
      this.loginUserDetails = res;
     }
    });
  }

 
  sendRequest(uid: any, fid: any) {
    this.friend.sendRequest(uid, fid).subscribe(
      (res:any) => {
        this.toastService.success(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  removeFriend() {
    if (
      confirm(
        'Are you sure you want to remove ' +
          this.CurrentVisitedUser.name +
          ' as your friend?'
      )
    ) {
      this.friend.unfriend(this.loginUserDetails._id, this.CurrentVisitedUser._id).subscribe(
        (res) => {
          this.toastService.success(
            'Successfully Remove From Your Friend List',
            'Success!'
          );
          this.sharedService.updatedUserDetails.next("true");
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  OpenMessengerDia() {
    const matDiaRef = this.matDia.open(BoxMessengerComponent, {
      width: '500px',
      height: '550px',
      data: {
        loginUser_id: this.loginUserDetails._id,
        friend_id: this.CurrentVisitedUser._id,
        friendUserToken: this.CurrentVisitedUser.userToken,
      },
    });
  }

  openEditProfileComponent() {
    this.matDia.open(EditProfileDetailsDialogComponent);
  }

  ngOnDestroy() {
    this.userService.currentVisitedUser.next('');
    this.destroy$.next();
  }

}
