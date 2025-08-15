import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FriendService } from 'src/app/common/services/friend.service';
import { StoriesService } from 'src/app/common/services/stories.service';
import { UserService } from 'src/app/common/services/user.service';
import { ShowStoriesDialogComponent } from '../show-stories-dialog/show-stories-dialog.component';

@Component({
  selector: 'app-show-stories',
  templateUrl: './show-stories.component.html',
  styleUrls: ['./show-stories.component.scss'],
})
export class ShowStoriesComponent implements OnInit {
  constructor(
    private userService: UserService,
    private storyManage: StoriesService,
    private friend: FriendService,
    private matDialogRef: MatDialog
  ) {}

  @Input('loginUserId') loginUserId: any;
  LoginUserDetails: any;
  unSubscribeLoginUser: Subscription | any;

  async ngOnInit() {
    await this.getCurrentLoginUser();
    this.getStories();
  }

  allStories: any;
  userStories: any;
  userFriendsStory: any;

  getCurrentLoginUser() {
    this.unSubscribeLoginUser = this.userService.currentLoginUser.subscribe(
      (res: any) => {
        if (res) {
          this.LoginUserDetails = res;
        }
      }
    );
  }

  getStories() {
    this.storyManage.getStories(this.loginUserId).subscribe(
      (res:any) => {
        // this.allStories = res;
        this.userStories = res.userStories;
        this.userFriendsStory = res.userFriendStories;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openSlider(allStories: any, selectedIndex: any) {
    this.matDialogRef.open(ShowStoriesDialogComponent, {
      maxWidth: '600px',
      maxHeight: '600px',
      minWidth: '550px',
      minHeight: '550px',

      panelClass: 'custom-modalbox',
      data: {
        allStories: allStories,
        selectedIndex: selectedIndex,
      },
    });
  }

  ngOnDestroy() {
    this.unSubscribeLoginUser.unsubscribe();
  }
}
