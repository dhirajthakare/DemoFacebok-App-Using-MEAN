import { Component, OnInit } from '@angular/core';
import { FriendService } from 'src/app/common/services/friend.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  
  constructor(
    private userservice: UserService,
    private friend: FriendService,
  ) { }

  likecounts = 0;

 

  data: any;

  ngOnInit(): void {
    this.userservice.currentLoginUser.subscribe((res: any) => {
      console.log(res);
      this.data = res;
      if (this.data) {
        this.getAllFriendsId();
      }
    });

    console.log(this.data);

  }

  friends: any;
  friendsId: Array<any> = [];

  getAllFriendsId() {

    this.friend.getUseFriends(this.data._id).subscribe(res => {
      this.friends = res;
      console.log(this.friends);
      this.friendsId = [];

      if (this.friends) {
        this.friends = this.friends.user_Friends;
        console.log("user " + this.data._id);
        this.friendsId.push(this.data._id);
        for (let i = 0; i < this.friends.length; i++) {
          console.log("friend " + this.friends[i].friend_id._id);
          this.friendsId.push(this.friends[i].friend_id._id);
        }
        console.log(this.friendsId);
        this.friend.userLoginFriendsId.next(this.friendsId);

      }

    }, err => {
      console.log(err);
    })
  }


}
