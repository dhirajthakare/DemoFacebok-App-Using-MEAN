import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BoxMessangerComponent } from 'src/app/common/box-messanger/box-messanger.component';
import { EditProfileDetailsDialogComponent } from 'src/app/common/main-header/edit-profile-details-dialog/edit-profile-details-dialog.component';
import { FriendService } from 'src/app/common/services/friend.service';
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
    private matDia: MatDialog
  ) {}

  data: any;
  CoverPhoto: any;
  currentUser: any;
  friendsId: any = [];


  ngOnInit(): void {
    this.getAllFriendsId();

    this.userservice.currentLoginUser.subscribe((res: any) => {
      console.log(res);
      this.data = res;
      if (this.data) {
        this.oninitgetdata();
      }
    });
  }

  oninitgetdata() {
    this.userservice.currentVisitedUser.subscribe((res: any) => {
      this.currentUser = res;
      console.log(this.currentUser);
      if (this.currentUser.user_info) {
        if (this.currentUser.user_info.CoverPhoto) {
          this.CoverPhoto =
            'http://localhost:2000' + this.currentUser.user_info.CoverPhoto;
        }
      }
      if (this.currentUser) {
      }
    });
  }
  getAllFriendsId() {
    this.friend.userLoginFriendsId.subscribe((res) => {
      this.friendsId = res;
      console.log(this.friendsId);
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
          this.currentUser.name +
          ' as your friend?'
      )
    ) {
      this.friend.unfriend(this.data._id, this.currentUser._id).subscribe(
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
        loginUser_id: this.data._id,
        friend_id: this.currentUser._id,
        friendUsertoken: this.currentUser.userToken,
      },
    });
  }

  openeditProfileComponant() {
    this.matDia.open(EditProfileDetailsDialogComponent);
  }

  ngOnDestroy() {}
}
