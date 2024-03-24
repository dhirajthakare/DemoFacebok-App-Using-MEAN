import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FriendService } from '../services/friend.service';
import { SharedDataService } from '../services/shared-data.service';
import { UserService } from '../services/user.service';
import { UpdateUserDialogComponent } from './update-user-dialog/update-user-dialog.component';
import { User } from '../interface/user.interface';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  friends: any;
  friendsId: string[] = [];

  constructor(
    private dialog: MatDialog,
    private navigateRoute: Router,
    private friendship: FriendService,
    private userService: UserService,
    private authService: AuthService,
    private sharedService: SharedDataService
  ) {}

  @ViewChild('searchArea') searchArea!: ElementRef;

  loginUserDetails!: User;
  unSubscribeUpdatedUserDetails!: Subscription;

  ngOnInit(): void {
    this.getCurrentUser();
    this.unSubscribeUpdatedUserDetails =
      this.sharedService.updatedUserDetails.subscribe((res: boolean) => {
        if (res) {
          this.getCurrentUser(res);
          this.sharedService.updatedUserDetails.next(false);
        }
      });
  }

  onFocus() {
    this.friendship.searchBoxVisibility.next(true);
  }

  onblur() {
    setTimeout(() => {
      this.friendship.searchBoxVisibility.next(false);
    }, 400);
  }

  searchFriends(item: string) {
    this.friendship.searchBox.next(item);
  }

  openUpdateUserDialog() {
    this.dialog.open(UpdateUserDialogComponent);
  }

  logout() {
    if (confirm('Are You sure You Want To Logout ? ')) {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('accountToken');
      this.navigateRoute.navigate(['']);
    }
  }

  async getCurrentUser(optionalForUpdateUser: boolean = false) {
    const res = await this.authService.getUserProfile();

    this.loginUserDetails = res;
    localStorage.setItem(
      'accountHolder',
      JSON.stringify(this.loginUserDetails)
    );
    this.userService.currentLoginUser.next(this.loginUserDetails);
    if (!optionalForUpdateUser) {
      this.getAllFriendsId();
    }
  }

  getAllFriendsId() {
    this.friendship.getUseFriends(this.loginUserDetails._id).subscribe(
      (res) => {
        this.friends = res;
        if (this.friends) {
          this.friendsId = [];
          this.friends = this.friends.user_Friends;
          this.friendsId.push(this.loginUserDetails._id);
          for (let i = 0; i < this.friends.length; i++) {
            this.friendsId.push(this.friends[i].friend_id._id);
          }
          this.friendship.userLoginFriendsId.next(this.friendsId);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnDestroy() {
    this.unSubscribeUpdatedUserDetails.unsubscribe();
    this.userService.currentLoginUser.next('');
    this.friendship.userLoginFriendsId.next([]);
    this.friendship.searchBox.next('');
  }
}
