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
  offsetValue = 0;
  @Input('PostLocation') PostLocation!: string;
  @Input() set offset(value: number) {
      this.offsetValue = value;
      if (this.PostLocation == 'Profile') {
        this.getAllFriendsPost();
      } else if (this.PostLocation == 'Main') {
        this.getAllFriendsPost();
      
    }
  }

  constructor(
    private post: PostService,
    private userService: UserService,
    private dialog: MatDialog,
    private friend: FriendService,
    private sharedService: SharedDataService
  ) {}

  Loader = true;
  allPosts: any = [];
  loginUserDetails: any;

  @ViewChild('comment') commentFocus: ElementRef | any;
  @ViewChild('postUpdateModalClose') postUpdateModalClose: any;

  private onDestroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.sharedService.postSavedSource
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res) => {
        if (res) {
          this.getAllFriendsPost();
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
          this.allPosts =[];
          this.getAllFriendsPost();
        }
      });
  }

  friendsId: any;
  getAllFriendsPost() {
    if(this.PostLocation== 'Main'){
      this.friend.userLoginFriendsId
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res) => {
        if (res) {
          this.friendsId = res;
          if (this.friendsId) {
            const payload = {
              friendsIds: this.friendsId,
              offset: this.offsetValue,
            };
            this.friend.getAllFriendsPost(payload).subscribe(
              (res: any) => {
                if (res) {
                  this.Loader = false;
                  this.allPosts = [...this.allPosts, ...res];
                }
              },
              (err) => {
                this.Loader = false;
                console.log(err);
              }
            );
          }
        }
      });
    }else if (this.PostLocation == 'Profile'){
      const payload = {
        friendsIds: [this.currentUser._id],
        offset: this.offsetValue,
      };
      this.friend.getAllFriendsPost(payload).subscribe(
        (res: any) => {
          if (res) {
            this.Loader = false;
            this.allPosts = [...this.allPosts, ...res];
          }
        },
        (err) => {
          this.Loader = false;
          console.log(err);
        }
      );

    }
  }

  async likePost(post: any, user_id: any) {
    let formData = {
      post_photo_id: post._id,
      user_id: user_id,
      userClickId: this.loginUserDetails._id,
    };
    
    const isUserLike  = post.allLikeUsers.find(
      (e: any) => e._id === this.loginUserDetails._id
    );

    if(isUserLike){
      post.allLikeUsers = post.allLikeUsers.filter(
        (e: any) => e._id !== this.loginUserDetails._id
      );
      post.likeCounts -= 1;
    }else{
      post.allLikeUsers.push(this.loginUserDetails);
        post.likeCounts += 1;
    }
    this.post.likeOrUnlike(formData)
  }

  deletePost(item: any) {
    if (confirm('are you sure to Delete Post?')) {
      this.post.deletePost(item._id).subscribe((res) => {
        this.allPosts = this.allPosts.filter((e:any)=>e._id !== item._id);
        
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
      (res: any) => {
        comment.value = '';
        this.addComments = '';
        res.userCommented = this.loginUserDetails;
        item.commentCounts += 1;

        item.postComments.push(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteComment(commentId: string, post:any) {
    if (confirm('Are You Sure You Want to Delete Comment ?')) {
      this.post.deleteComment(commentId, post._id).subscribe(
        (res) => {
          post.postComments = post.postComments.filter((e:any)=>e._id !== commentId)
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

  CheckUserLike(json: any, id: any) {
    return json.find((e: any) => e._id === id);
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
