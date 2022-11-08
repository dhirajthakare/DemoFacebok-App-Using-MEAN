import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription, takeUntil } from 'rxjs';
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
    private userservice: UserService,
    private dialog: MatDialog,
    private friend: FriendService,
    private sharedService: SharedDataService
  ) {}

  Loader = true;
  allPosts: any;
  loginuserDetails: any;

  @ViewChild('comment') commentfocus: ElementRef | any;
  @ViewChild('postUpdateModalClose') postUpdateModalClose: any;

  private onDestroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.sharedService.postSavedSource.pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
        if (res) {
          console.log(res);
          this.getCurrentUserpost();
          this.sharedService.postSavedSource.next(false);
        }
      });

    this.getLoginUserDetails();
  }

  getLoginUserDetails() {
    this.Loader = true;
    this.userservice.currentLoginUser.pipe(takeUntil(this.onDestroy$)).subscribe(
      (res: any) => {
        if (res) {
          this.loginuserDetails = res;
          if (this.loginuserDetails) {
            console.log(this.loginuserDetails);
            this.oninitgetdata();
          }
        }
      }
    );
  }

  currentUser: any;
  oninitgetdata() {
    this.userservice.currentVisitedUser.pipe(takeUntil(this.onDestroy$)).subscribe((res: any) => {
        this.currentUser = res;
        console.log(res);
        this.getCurrentUserpost();
      });
  }

  datasubtitle: any;
  getCurrentUserpost() {
    if (this.PostLocation == 'Profile') {
      
      this.datasubtitle = this.userservice
        .getCurrentUserPost(this.currentUser._id, this.loginuserDetails._id)
        .subscribe(
          (res) => {
            if(res){
            this.Loader = false;
            this.allPosts = res;
            console.log(res);
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
    this.friend.userLoginFriendsId.pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      if(res){
      this.friendsId = res;
      if (this.friendsId) {
        this.friend.getAllFriendsPost(this.friendsId).subscribe(
          (res) => {
            this.Loader = false;
            this.allPosts = res;
            console.log(this.allPosts);
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

  likestarted: boolean = false;
  onlike(post_id: any, user_id: any) {
    this.likestarted = true;
    let formData = {
      post_photo_id: post_id,
      user_id: user_id,
      userclick_id: this.loginuserDetails._id,
    };
    this.post.likeorUnlike(formData).subscribe((res) => {
      this.likestarted = false;
      this.getCurrentUserpost();
    });
  }

  deletePost(item: any) {
    if (confirm('are you sure to Delete Post?')) {
      this.post.deletePost(item._id).subscribe((res) => {
        console.log('deletion done');
        this.getCurrentUserpost();
      });
    }
  }

  comment: any = [];
  checkcomment: boolean = false;
  checkpostid: any;
  oncomments(item: any) {

    if (this.comment.includes(item._id)) {
      this.comment.forEach((value: number, index: any) => {
        if (value == item._id) this.comment.splice(index, 1);
      });
    } else {
      this.comment.push(item._id);
      this.checkpostid = item._id;
    }

    this.addComments = '';
    this.commentEmojiPicker = false;
  }
  addcomment(item: any) {
    if (this.comment.includes(item._id)) {
    } else {
      this.comment.push(item._id);
    }
    this.checkpostid = item._id;

    this.addComments = '';
    setTimeout(() => {
      this.commentfocus.nativeElement.focus();
    }, 0);

  }

  createcomment(comment: any, item: any) {

    let FormData = {
      comment: comment.value,
      post_photo_id: item._id,
      user_id: item.user_id,
      usercomment_id: this.loginuserDetails._id,
    };

    this.post.createcomment(FormData).subscribe(
      (res) => {
        comment.value = '';
        this.addComments = '';
        this.getCurrentUserpost();
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteComment(cid: number, pid: number) {
    if (confirm('Are You Sure You Want to Delete Comment ?')) {
      this.post.deletcomment(cid, pid).subscribe(
        (res) => {
          this.getCurrentUserpost();
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
      let jsoncheck = json[index];
      if (jsoncheck.userclick_id._id == ids) {
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
      width: '500px',
      data: item,
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
