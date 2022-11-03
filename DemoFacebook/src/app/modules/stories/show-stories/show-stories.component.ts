import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FriendService } from 'src/app/common/services/friend.service';
import { StorieService } from 'src/app/common/services/storie.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-show-stories',
  templateUrl: './show-stories.component.html',
  styleUrls: ['./show-stories.component.scss'],
})
export class ShowStoriesComponent implements OnInit {
  constructor(
    private userservice: UserService,
    private storymanage: StorieService,
    private friend: FriendService
  ) {}

  @Input('loginUserId') loginUserId: any;
  LoginUserDetails: any;
  unSubscribeLoginUser: Subscription | any;

  ngOnInit(): void {
    // console.log(this.loginUserId);
    this.getcurrentLoginUser();
    this.getAllUserId(this.loginUserId);
  }

  allstory: any;
  userstory: any;
  userFriensStory: any;

  getcurrentLoginUser() {
    this.unSubscribeLoginUser = this.userservice.currentLoginUser.subscribe(
      (res: any) => {
        if (res) {
          // console.log(res);
          this.LoginUserDetails = res;
        }
      }
    );
  }

  getstories() {
    this.storymanage.getstory(this.loginUserId, this.friendsId).subscribe(
      (res) => {
        // console.log(res);
        this.allstory = res;
        this.userstory = this.allstory[1].userstories;
        this.userFriensStory = this.allstory[2].userFriendStories;
        this.allstory = this.allstory[0].allStories;
        // console.log(this.allstory);
        // console.log(this.userstory);
        // console.log(this.userFriensStory);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  friends: any;
  friendsId: any = [];
  getAllUserId(id: any) {
    this.friend.getUseFriends(id).subscribe(
      (res) => {
        if (res) {
          this.friends = res;
          // console.log(this.friends);

          if (this.friends) {
            this.friends = this.friends.user_Friends;
            // this.friendsId.push(this.id);
            for (let i = 0; i < this.friends.length; i++) {
              this.friendsId.push(this.friends[i]._id);
            }
            // this.friend.userLoginFriendsId.next(this.friendsId);
            // console.log(this.friendsId);
            if(this.friendsId){
              this.getstories();
            }
          }
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
