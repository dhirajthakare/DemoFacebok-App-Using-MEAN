import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BoxMessengerComponent } from 'src/app/common/box-messenger/box-messenger.component';
import { FriendService } from 'src/app/common/services/friend.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-main-sidebar-right',
  templateUrl: './main-sidebar-right.component.html',
  styleUrls: ['./main-sidebar-right.component.scss'],
})
export class MainSidebarRightComponent implements OnInit {
  constructor(
    private userService: UserService,
    private friendship: FriendService,
    private matDia: MatDialog
  ) {}

  LoginUserDetails: any;
  friends: any;
  unSubscribeLoginUser: Subscription | any;

  ngOnInit(): void {
    this.getCurrentLoginUser();
  }

  getCurrentLoginUser() {
    this.unSubscribeLoginUser = this.userService.currentLoginUser.subscribe(
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

  async getUserFriends() {
    const res = await this.friendship.getUseFriends(this.LoginUserDetails._id);
    this.friends = res;
  }

  OpenMessengerDia(item: any) {
    const matDiaRef = this.matDia.open(BoxMessengerComponent, {
      width: '500px',
      height: '550px',
      data: {
        loginUser_id: this.LoginUserDetails._id,
        friend_id: item._id,
        friendUserToken: item.userToken,
      },
    });
  }

  ngOnDestroy() {
    this.unSubscribeLoginUser.unsubscribe();
  }
}
