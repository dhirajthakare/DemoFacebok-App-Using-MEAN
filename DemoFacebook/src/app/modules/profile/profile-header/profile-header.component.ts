import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { BoxMessangerComponent } from 'src/app/common/box-messanger/box-messanger.component';
import { EditProfileDetailsDialogComponent } from 'src/app/common/main-header/edit-profile-details-dialog/edit-profile-details-dialog.component';
import { FriendService } from 'src/app/common/services/friend.service';
import { SharedDataService } from 'src/app/common/services/shared-data.service';
import { UserService } from 'src/app/common/services/user.service';
import { ProfileComponent } from '../profile.component';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent implements OnInit {
  constructor(
    private userservice: UserService,
    private profileComp: ProfileComponent,
    private friend: FriendService,
    private toastr: ToastrService,
    private matDia: MatDialog,
    private route:Router,
    private activeRoute:ActivatedRoute,
    private sharedService:SharedDataService
  ) {}

  loginUserDetails: any;
  CoverPhoto: any;
  CurrentvisitedUser: any;
  friendsId: any = [];
  destroy$:Subject<void> = new Subject<void>();


  ngOnInit(): void {
    this.getCurrentvisitedUserData();
    this.sharedService.editProfileSave.pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      if (res) {
        this.getCurrentvisitedUserData();
        this.sharedService.editProfileSave.next(false);
      }
    });
    this.getAllFriendsId();
    this.getCurrentLoginUser();
  }

  getCurrentvisitedUserData() {
    this.activeRoute.params.subscribe((res) => {
      let visitedUserToken = res['token'];
      if (visitedUserToken) {
        this.userservice.getUser(visitedUserToken).subscribe(
          (res) => {
           if(res){
            // console.log(res);
            this.CurrentvisitedUser = res;
            if (this.CurrentvisitedUser.user_info) {
              if (this.CurrentvisitedUser.user_info.CoverPhoto) {
                this.CoverPhoto =
                  'http://localhost:2000' + this.CurrentvisitedUser.user_info.CoverPhoto;
              }
            }
            this.userservice.currentVisitedUser.next(res);
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
        // console.log(res);
        this.friendsId = res;
      }
    });
  }

  getCurrentLoginUser() {
    this.userservice.currentLoginUser.pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
     if(res){
      // console.log(res);
      this.loginUserDetails = res;
     }
    });
  }

 
  sendRequest(uid: any, fid: any) {
    this.friend.sendRequest(uid, fid).subscribe(
      (res) => {
        this.toastr.success('Request send succeessfully');
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
          this.CurrentvisitedUser.name +
          ' as your friend?'
      )
    ) {
      this.friend.unfriend(this.loginUserDetails._id, this.CurrentvisitedUser._id).subscribe(
        (res) => {
          console.log(res);
          this.toastr.success(
            'Successfully Remove From Your Friend List',
            'Success!'
          );
          this.profileComp.ngOnInit();
          this.ngOnInit();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  OpenMessangerDia() {
    const matDiaref = this.matDia.open(BoxMessangerComponent, {
      width: '500px',
      height: '500px',
      data: {
        loginUser_id: this.loginUserDetails._id,
        friend_id: this.CurrentvisitedUser._id,
        friendUsertoken: this.CurrentvisitedUser.userToken,
      },
    });
  }

  openeditProfileComponant() {
    this.matDia.open(EditProfileDetailsDialogComponent);
  }

  ngOnDestroy() {
    this.userservice.currentVisitedUser.next('');
    this.destroy$.next();
  }

}
