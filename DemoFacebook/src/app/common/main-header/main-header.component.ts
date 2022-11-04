import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FriendService } from '../services/friend.service';
import { SharedDataService } from '../services/shared-data.service';
import { UserService } from '../services/user.service';
import { UpdateUserDialogComponent } from './update-user-dialog/update-user-dialog.component';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private navicateRoute: Router,
    private friendship: FriendService,
    private userservice: UserService,
    private authservice:AuthService,
    private sharedService:SharedDataService
  ) {}

  @ViewChild('searcharea') searcharea!: ElementRef;
  @ViewChild('updateModalClose') updateModalClose: any;

  updateerr: any;
  updatesuccess: any;
  Profilesrc: any;
  file: any;
  loginuserDetails: any;
  unsubscriptionupdatedUserDetails: Subscription | any;

  ngOnInit(): void {
    this.getcurrentuser();
    this.unsubscriptionupdatedUserDetails = this.sharedService.updatedUserDetails.subscribe((res: any) => {
      if (res) {
        this.getcurrentuser();
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

  searchFriends(item: any) {
    this.friendship.serchbox.next(item.value);
  }

  openUpdateUserDialog() {
    this.dialog.open(UpdateUserDialogComponent);
  }

  logout() {
    if (confirm('Are You sure You Want To Logout ? ')) {
      localStorage.removeItem('loggedin');
      localStorage.removeItem('accountToken');
      this.navicateRoute.navigate(['']);
    }
  }

  getcurrentuser() {
    this.authservice.getUserProfile().subscribe((res) => {
      if(res){
      this.loginuserDetails = res;
      if(this.loginuserDetails){
      localStorage.setItem('accountHolder', JSON.stringify(this.loginuserDetails));
      this.userservice.currentLoginUser.next(this.loginuserDetails);
      this.getAllFriendsId()
      }
      }
    });
  }

  
  friends: any;
  friendsId: Array<any> = [];

  getAllFriendsId() {
    this.friendship.getUseFriends(this.loginuserDetails._id).subscribe(
      (res) => {
        this.friends = res;
        if (this.friends) {
          this.friends = this.friends.user_Friends;
          this.friendsId.push(this.loginuserDetails._id);
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

  ngOnDestroy(){
    this.unsubscriptionupdatedUserDetails.unsubscribe();
    this.userservice.currentLoginUser.next('');
    this.friendship.userLoginFriendsId.next('');
    this.friendship.serchbox.next('');
  }
}
