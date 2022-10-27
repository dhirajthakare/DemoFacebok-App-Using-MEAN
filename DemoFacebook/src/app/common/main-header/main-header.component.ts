import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    private sharedService:SharedDataService
  ) {}

  @ViewChild('searcharea') searcharea!: ElementRef;
  @ViewChild('updateModalClose') updateModalClose: any;

  updateerr: any;
  updatesuccess: any;
  Profilesrc: any;
  file: any;
  data: any;

  ngOnInit(): void {
    this.getcurrentuser();
    this.sharedService.editProfileSave.subscribe((res: any) => {
      if (res) {
        this.getcurrentuser();
        this.sharedService.editProfileSave.next(false);
      }
      console.log(res);
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
    let token = localStorage.getItem('accountToken');
    this.userservice.getUser(token).subscribe((res) => {
      this.data = res;
      console.log(res);
      localStorage.setItem('accountHolder', JSON.stringify(res));
      this.userservice.currentLoginUser.next(res);
    });
  }
}
