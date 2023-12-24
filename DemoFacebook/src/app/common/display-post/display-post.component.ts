import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { FriendService } from '../services/friend.service';
import { PostService } from '../services/post.service';
import { SharedDataService } from '../services/shared-data.service';
import { UserService } from '../services/user.service';
import { LikeUserDialogComponent } from './like-user-dialog/like-user-dialog.component';
import { UpdatePostDialogComponent } from './update-post-dialog/update-post-dialog.component';

@Component({
  selector: 'app-display-post',
  templateUrl: './display-post.component.html',
  styleUrls: ['./display-post.component.scss'],
})
export class DisplayPostComponent implements OnInit {
  @Input('PostLocation') PostLocation: any;

  constructor(
    private post: PostService,
    private userService: UserService,
    private dialog: MatDialog,
    private friend: FriendService,
    private sharedService: SharedDataService
  ) {}

  Loader = true;
  allPosts: any;
  loginUserDetails: any;

  @ViewChild('comment') commentFocus: ElementRef | any;
  @ViewChild('postUpdateModalClose') postUpdateModalClose: any;

  private onDestroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.sharedService.postSavedSource
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res) => {
        if (res) {
          this.getCurrentUserPost();
          this.sharedService.postSavedSource.next(false);
        }
      });

    this.getLoginUserDetails();
  }

  getLoginUserDetails() {
    this.Loader = true;
    this.userService.currentLoginUser
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res: any) => {
        if (res) {
          this.loginUserDetails = res;
          if (this.loginUserDetails) {
            if (this.PostLocation == 'Profile') {
              this.initializeData();
            } else if (this.PostLocation == 'Main') {
              this.getAllFriendsPost();
            }
          }
        }
      });
  }

  currentUser: any;
  initializeData() {
    this.userService.currentVisitedUser
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res: any) => {
        if (res) {
          this.currentUser = res;
          this.getCurrentUserPost();
        }
      });
  }

  dataSubtitle: any;
  getCurrentUserPost() {
    if (this.PostLocation == 'Profile') {
      this.dataSubtitle = this.userService
        .getCurrentUserPost(this.currentUser._id, this.loginUserDetails._id)
        .subscribe(
          (res) => {
            if (res) {
              this.Loader = false;
              this.allPosts = res;
            }
          },
          (err) => {
            this.Loader = false;
            console.log(err);
          }
        );
    } else if (this.PostLocation == 'Main') {
      this.getAllFriendsPost();
    }
  }

  friendsId: any;
  getAllFriendsPost() {
    this.friend.userLoginFriendsId
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res) => {
        if (res) {
          this.friendsId = res;
          if (this.friendsId) {
            this.friend.getAllFriendsPost(this.friendsId).subscribe(
              (res) => {
                this.Loader = false;
                this.allPosts = res;
              },
              (err) => {
                this.Loader = false;
                console.log(err);
              }
            );
          }
        }
      });
  }

  isLikeClick: boolean = false;
  likePost(post_id: any, user_id: any) {
    this.isLikeClick = true;
    let formData = {
      post_photo_id: post_id,
      user_id: user_id,
      userClickId: this.loginUserDetails._id,
    };
    this.post.likeOrUnlike(formData).subscribe((res) => {
      this.isLikeClick = false;
      this.getCurrentUserPost();
    });
  }

  deletePost(item: any) {
    if (confirm('are you sure to Delete Post?')) {
      this.post.deletePost(item._id).subscribe((res) => {
        this.getCurrentUserPost();
      });
    }
  }

  comment: any = [];
  checkPostId: any;
  onComments(item: any) {
    if (this.comment.includes(item._id)) {
      this.comment.forEach((value: number, index: any) => {
        if (value == item._id) this.comment.splice(index, 1);
      });
    } else {
      this.comment.push(item._id);
      this.checkPostId = item._id;
    }

    this.addComments = '';
    this.commentEmojiPicker = false;
  }
  addComment(item: any) {
    if (this.comment.includes(item._id)) {
    } else {
      this.comment.push(item._id);
    }
    this.checkPostId = item._id;

    this.addComments = '';
    setTimeout(() => {
      this.commentFocus.nativeElement.focus();
    }, 0);
  }

  createComment(comment: any, item: any) {
    let FormData = {
      comment: comment.value,
      post_photo_id: item._id,
      user_id: item.user_id,
      user_commented_id: this.loginUserDetails._id,
    };

    this.post.createComment(FormData).subscribe(
      (res) => {
        comment.value = '';
        this.addComments = '';
        this.getCurrentUserPost();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteComment(cid: number, pid: number) {
    if (confirm('Are You Sure You Want to Delete Comment ?')) {
      this.post.deleteComment(cid, pid).subscribe(
        (res) => {
          this.getCurrentUserPost();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  onFocus() {
    this.commentEmojiPicker = false;
  }

  //Emoji for comments
  addComments: any = '';
  commentEmojiPicker: boolean = false;

  commentToggleEmojiPicker() {
    this.commentEmojiPicker = !this.commentEmojiPicker;
  }
  addEmojiUPOnComment(event: any) {
    const addComments = this.addComments;
    const text = addComments + event.emoji.native;
    this.addComments = text;
  }

  CheckUserLike(json: any, ids: any) {
    let hasMatch = false;
    for (let index = 0; index < json.length; ++index) {
      let jsonCheck = json[index];
      if (jsonCheck.userClickId._id == ids) {
        hasMatch = true;
        break;
      }
    }
    return hasMatch;
  }

  likeDialog(item: any) {
    this.dialog.open(LikeUserDialogComponent, {
      width: '500px',
      data: item,
    });
  }

  UpdatePostDialog(item: any) {
    this.dialog.open(UpdatePostDialogComponent, {
      width: '600px',
      data: item,
    });
  }

  TrackByFunc(index: number, item: any) {
    return item._id;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
