import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AcceptCallComponent } from 'src/app/common/accept-call/accept-call.component';
import { FriendService } from 'src/app/common/services/friend.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-messanger-sidebar-right',
  templateUrl: './messanger-sidebar-right.component.html',
  styleUrls: ['./messanger-sidebar-right.component.scss'],
})
export class MessangerSidebarRightComponent implements OnInit {
  constructor(
    private userservice: UserService,
    private friendship: FriendService,
    private matdialog: MatDialog
  ) {}

  loginuserDetails: any;
  friends: any;
  private onDestroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.getLoginUserDetails();
  }

  getLoginUserDetails() {
    this.userservice.currentLoginUser
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res: any) => {
        if (res) {
          this.loginuserDetails = res;
          if (this.loginuserDetails) {
            this.getUserFriends();
          }
        }
      });
  }

  getUserFriends() {
    this.friendship.getUseFriends(this.loginuserDetails._id).subscribe(
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
      .getUseSerachFriends(this.loginuserDetails._id, searchfrd)
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
        loginUser_id: this.loginuserDetails._id,
        friend_userToken: this.friends.user_Friends[0].friend_id.userToken,
      };
      this.userservice.currentMessangerUser.next(newdata);
    }
  }

  Opemessanger(data: any) {
    let newdata = {
      friend_id: data._id,
      loginUser_id: this.loginuserDetails._id,
      friend_userToken: data.userToken,
    };
    this.userservice.currentMessangerUser.next(newdata);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.userservice.currentMessangerUser.next('');
  }

  openAcceptCall() {
    this.matdialog.open(AcceptCallComponent, {
      disableClose:false
    });
  }
}
