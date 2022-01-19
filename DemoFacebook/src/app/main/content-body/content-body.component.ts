import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FriendrelationshipService } from 'src/app/services/friendrelationship.service';
import { UsermiddlewareService } from 'src/app/services/usermiddleware.service';

@Component({
  selector: 'app-content-body',
  templateUrl: './content-body.component.html',
  styleUrls: ['./content-body.component.css']
})
export class ContentBodyComponent implements OnInit {

  constructor(
    private userservice: UsermiddlewareService,
    private friend: FriendrelationshipService,
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
