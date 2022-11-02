import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FriendService } from 'src/app/common/services/friend.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {
  constructor(
    private userservice: UserService,
    private friend: FriendService
  ) {}

  likecounts = 0;

  LoginUserDetails: any;
  unSubscribeLoginUser: Subscription | any;

  ngOnInit(): void {
    this.getCurrentLoginDetails();
  }

  getCurrentLoginDetails() {
    this.unSubscribeLoginUser = this.userservice.currentLoginUser.subscribe(
      (res: any) => {
        if (res) {
          console.log(res);
          this.LoginUserDetails = res;
          this.getAllFriendsId();
        }
      }
    );
  }

  friends: any;
  friendsId: Array<any> = [];

  getAllFriendsId() {
    this.friend.getUseFriends(this.LoginUserDetails._id).subscribe(
      (res) => {
        this.friends = res;
        console.log(this.friends);
        this.friendsId = [];

        if (this.friends) {
          this.friends = this.friends.user_Friends;
          this.friendsId.push(this.LoginUserDetails._id);
          for (let i = 0; i < this.friends.length; i++) {
            this.friendsId.push(this.friends[i].friend_id._id);
          }
          console.log(this.friendsId);
          this.friend.userLoginFriendsId.next(this.friendsId);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnDestroy() {
    this.unSubscribeLoginUser.unsubscribe();
  }
}
