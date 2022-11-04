import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BoxMessangerComponent } from 'src/app/common/box-messanger/box-messanger.component';
import { FriendService } from 'src/app/common/services/friend.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-main-sidebar-right',
  templateUrl: './main-sidebar-right.component.html',
  styleUrls: ['./main-sidebar-right.component.scss'],
})
export class MainSidebarRightComponent implements OnInit {
  constructor(
    private userservice: UserService,
    private friendship: FriendService,
    private matDia: MatDialog
  ) {}

  LoginUserDetails: any;
  friends: any;
  unSubscribeLoginUser: Subscription | any;

  ngOnInit(): void {
    this.getCurrentLoginuser();
  }

  getCurrentLoginuser() {
    this.unSubscribeLoginUser = this.userservice.currentLoginUser.subscribe(
      (res: any) => {
        if (res) {
          this.LoginUserDetails = res;
          if (this.LoginUserDetails) {
            this.getUserFriends();
          }
        }
      }
    );
  }

  getUserFriends() {
    this.friendship.getUseFriends(this.LoginUserDetails._id).subscribe(
      (res) => {
        this.friends = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  OpenMessangerDia(item: any) {
    const matDiaref = this.matDia.open(BoxMessangerComponent, {
      width: '500px',
      height: '500px',
      data: {
        loginUser_id: this.LoginUserDetails._id,
        friend_id: item._id,
        friendUsertoken: item.userToken,
      },
    });
  }

  ngOnDestroy() {
    this.unSubscribeLoginUser.unsubscribe();
  }
}
