import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AcceptCallComponent } from 'src/app/common/accept-call/accept-call.component';
import { FriendService } from 'src/app/common/services/friend.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-messenger-sidebar-right',
  templateUrl: './messenger-sidebar-right.component.html',
  styleUrls: ['./messenger-sidebar-right.component.scss'],
})
export class MessengerSidebarRightComponent implements OnInit {
  constructor(
    private userService: UserService,
    private friendship: FriendService,
    private matDialogRef: MatDialog
  ) {}

  loginUserDetails: any;
  friends: any;
  private onDestroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.getLoginUserDetails();
  }

  getLoginUserDetails() {
    this.userService.currentLoginUser
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res: any) => {
        if (res) {
          this.loginUserDetails = res;
          if (this.loginUserDetails) {
            this.getUserFriends();
          }
        }
      });
  }

  getUserFriends() {
    this.friendship.getUseFriends(this.loginUserDetails._id).subscribe(
      (res) => {
        if (res) {
          this.friends = res;
          this.assignRecentChat();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getUserSearchFriends(searchfrd: any) {
    this.friendship
      .getUseSerachFriends(this.loginUserDetails._id, searchfrd)
      .subscribe(
        (res) => {
          // this.friends=res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  assignRecentChat() {
    if (this.friends.user_Friends.length) {
      let newdata = {
        friend_id: this.friends.user_Friends[0].friend_id._id,
        loginUser_id: this.loginUserDetails._id,
        friend_userToken: this.friends.user_Friends[0].friend_id.userToken,
      };
      this.userService.currentMessengerUser.next(newdata);
    }
  }

  Opemessenger(data: any) {
    let newdata = {
      friend_id: data._id,
      loginUser_id: this.loginUserDetails._id,
      friend_userToken: data.userToken,
    };
    this.userService.currentMessengerUser.next(newdata);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.userService.currentMessengerUser.next('');
  }

  openAcceptCall() {
    this.matDialogRef.open(AcceptCallComponent, {
      disableClose:false
    });
  }
}
