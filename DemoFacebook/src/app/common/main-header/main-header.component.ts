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
    private navigateRoute: Router,
    private friendship: FriendService,
    private userService: UserService,
    private authService:AuthService,
    private sharedService:SharedDataService
  ) {}

  @ViewChild('searchArea') searchArea!: ElementRef;
  @ViewChild('updateModalClose') updateModalClose: any;

  updateError: any;
  updateSuccess: any;
  profileSrc: any;
  file: any;
  loginUserDetails: any;
  unSubscribeUpdatedUserDetails: Subscription | any;

  ngOnInit(): void {
    this.getCurrentUser();
    this.unSubscribeUpdatedUserDetails = this.sharedService.updatedUserDetails.subscribe((res: any) => {
      if (res) {
        this.getCurrentUser(true,res);
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
    this.friendship.searchBox.next(item.value);
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

  getCurrentUser(optionalForUpdateUser:boolean=false,exceptions:any = true) {
    this.authService.getUserProfile().subscribe((res) => {
      if(res){
      this.loginUserDetails = res;
      if(this.loginUserDetails){
      localStorage.setItem('accountHolder', JSON.stringify(this.loginUserDetails));
      this.userService.currentLoginUser.next(this.loginUserDetails);
      if(!optionalForUpdateUser || typeof(exceptions) === "string" ){
        this.getAllFriendsId()
      }
      }
      }
    });
  }

  
  friends: any;
  friendsId: Array<any> = [];

  getAllFriendsId() {
    this.friendship.getUseFriends(this.loginUserDetails._id).subscribe(
      (res) => {
        this.friends = res;
        if (this.friends) {
          this.friendsId=[];
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

  ngOnDestroy(){
    this.unSubscribeUpdatedUserDetails.unsubscribe();
    this.userService.currentLoginUser.next('');
    this.friendship.userLoginFriendsId.next('');
    this.friendship.searchBox.next('');
  }
}
