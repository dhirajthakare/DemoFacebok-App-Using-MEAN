import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostService } from '../services/create-post.service';
import { FriendrelationshipService } from '../services/friendrelationship.service';
import { ShareServiceService } from '../services/share-service.service';
import { UsermiddlewareService } from '../services/usermiddleware.service';
import { LikeUserDialogComponent } from './like-user-dialog/like-user-dialog.component';
import { UpdatePostDialogComponent } from './update-post-dialog/update-post-dialog.component';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input('PostLocation') PostLocation:any;


  constructor(
    private post: CreatePostService,
    private userservice: UsermiddlewareService,
    private dialog: MatDialog,
    private friend:FriendrelationshipService,
    private sharedService : ShareServiceService
    ) { 
      this.data = [];
    }

  Loader = true;
  allPosts: any;
  data: any;

  @ViewChild('comment') commentfocus: ElementRef | any;
  @ViewChild('postUpdateModalClose') postUpdateModalClose: any;

  ngOnInit(): void {
    this.data =[];
    this.sharedService.postSavedSource.subscribe(res => {
      if(res){
        this.getCurrentUserpost();
        this.sharedService.postSavedSource.next(false)
      }
      console.log(res)
    })


    this.allPosts=[];
    console.log(this.PostLocation);
    this.Loader = true
    this.userservice.currentLoginUser.subscribe((res: any) => {
      console.log(res);
      this.data = res;
      if (this.data) {
        this.oninitgetdata();
      }
    });

    console.log(this.data);
  }

  currentUser: any;
  oninitgetdata() {

    this.userservice.currentVisitedUser.subscribe((res: any) => {
      this.currentUser = res;
      console.log(res);
      if (this.currentUser || this.PostLocation=="Main") {
        this.getCurrentUserpost();
      }
    

    })

  }

  datasubtitle: any;
  getCurrentUserpost() {

    if(this.PostLocation == "Profile"){
      console.log(this.PostLocation)
      console.log("Profile  Componant");
      this.datasubtitle = this.userservice.getCurrentUserPost(this.currentUser._id, this.data._id).subscribe((res) => {
        this.Loader = false
        this.allPosts = res;
        console.log(res);
        
      }, err => {
        this.Loader = false
        console.log(err);
      })
    }else if(this.PostLocation == "Main"){
      console.log(this.PostLocation)
      console.log("Main Componant");
      this.getAllFriendsId();


    }
    

  }
  friendsId:any;
  getAllFriendsId(){

    this.friend.userLoginFriendsId.subscribe(res=>{
      this.friendsId = res;
      if(this.friendsId){
        this.friend.getAllFriendsPost(this.friendsId).subscribe(res => {
          this.Loader = false;
          this.allPosts = '';
          this.allPosts = res;
          console.log(this.allPosts);
    
        }, err => {
          this.Loader = false;
          console.log(err);
        })
      }
    })

    }

  likestarted: boolean = false;
  onlike(post_id: any, user_id: any) {
    this.likestarted = true
    let fdata = {
      "post_photo_id": post_id,
      "user_id": user_id,
      "userclick_id": this.data._id
    }
    this.post.likeorUnlike(fdata).subscribe(res => {
      this.likestarted = false
      this.oninitgetdata();
      console.log(res);
    })

  }

  deletePost(item: any) {

    if (confirm("are you sure to Delete Post?")) {
      this.post.deletePost(item._id).subscribe((res) => {
        console.log("deletion done");
        this.getCurrentUserpost();
      })
    }

  }

  comment: any = [];
  checkcomment: boolean = false;
  checkpostid: any;
  oncomments(item: any) {

    if (this.comment.includes(item._id)) {

      this.comment.forEach((value: number, index: any) => {
        if (value == item._id) this.comment.splice(index, 1);
      })
    } else {
      this.comment.push(item._id);
      this.checkpostid = item._id;

    }


    console.log(this.comment);
    this.addComments = '';
    this.commentEmojiPicker = false;
    // this.comment=item.id;
    // this.comment =! this.comment;
  }
  addcomment(item: any) {
    if (this.comment.includes(item._id)) {

    } else {
      this.comment.push(item._id);

    }
    this.checkpostid = item._id;
    console.log(this.comment);


    this.addComments = '';
    setTimeout(() => {
      this.commentfocus.nativeElement.focus();

    }, 0);

    // this.comment =! this.comment;
  }

  createcomment(comment: any, item: any) {

    console.log(item);


    let dataf = {
      "comment": comment.value,
      "post_photo_id": item._id,
      "user_id": item.user_id,
      "usercomment_id": this.data._id


    }

    this.post.createcomment(dataf).subscribe((res) => {
      comment.value = "";
      this.addComments = '';
      this.getCurrentUserpost();
      console.log(res);
    }, (err) => {
      console.log(err);
    });

  }

  deleteComment(cid: number, pid: number) {

    if (confirm('Are You Sure You Want to Delete Comment ?')) {
      this.post.deletcomment(cid, pid).subscribe((res) => {
        console.log(res);
        this.getCurrentUserpost();
      }, err => {
        console.log(err);
      })

    }
  }
  
  onFocus() {

    this.commentEmojiPicker = false;

  }

  //Emoji for comments 
  addComments: any = "";
  commentEmojiPicker: boolean = false;

  commentToggleEmojiPicker() {
    this.commentEmojiPicker = !this.commentEmojiPicker;
  }
  addEmojiUPOnComment(event: any) {
    const addComments = this.addComments
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
      data: item
    });

  }

  UpdatePostDialog(item: any) {

    this.dialog.open(UpdatePostDialogComponent, {
      width: '500px',
      data: item
    });

  }

}
