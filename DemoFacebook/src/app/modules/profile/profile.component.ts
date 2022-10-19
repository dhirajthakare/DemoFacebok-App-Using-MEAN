import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FriendService } from 'src/app/common/services/friend.service';
import { SharedDataService } from 'src/app/common/services/shared-data.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userservice: UserService,
    private friend: FriendService,
    private routeNav: Router,
    private sharedService: SharedDataService
  ) {}

  userdata: any;
  token: any;
  data: any;
  friends: any;
  friendsId: any = [];

  ngOnInit(): void {
    this.sharedService.changeTitle('Deskbook | Profile');

    this.getCurrentUserData();

    this.sharedService.editProfileSave.subscribe((res: any) => {
      if (res) {
        this.getCurrentUserData();
        this.sharedService.editProfileSave.next(false);
      }
      console.log(res);
    });
  }

  getCurrentUserData() {
    this.route.params.subscribe((res) => {
      this.userdata = res['token'];
      console.log(this.userdata);
      if (this.userdata) {
        this.userservice.getUser(this.userdata).subscribe(
          (res) => {
            console.log(res);
            this.userdata = res;
            this.userservice.currentVisitedUser.next(res);
            this.getCurrentLoginUser();
          },
          (err) => {
            this.routeNav.navigate(['error']);
          }
        );
      }
    });
  }

  getCurrentLoginUser() {
    this.token = localStorage.getItem('accountToken');
    this.userservice.getUser(this.token).subscribe((res) => {
      this.data = res;
      localStorage.setItem('accountHolder', JSON.stringify(res));
      this.userservice.currentLoginUser.next(res);
      if (this.data) {
        this.getAllFriendsId();
      }
    });
  }

  getAllFriendsId() {
    this.friend.getUseFriends(this.data._id).subscribe(
      (res) => {
        this.friendsId = [];
        this.friends = res;
        console.log(this.friends);

        if (this.friends) {
          this.friends = this.friends.user_Friends;
          this.friendsId.push(this.data._id);
          for (let i = 0; i < this.friends.length; i++) {
            this.friendsId.push(this.friends[i].friend_id._id);
          }
          this.friend.userLoginFriendsId.next(this.friendsId);
        }
        console.log(this.friendsId);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
