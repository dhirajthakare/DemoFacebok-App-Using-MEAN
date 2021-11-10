import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CreatePostService } from 'src/app/services/create-post.service';
import { FriendrelationshipService } from 'src/app/services/friendrelationship.service';
import { UsermiddlewareService } from 'src/app/services/usermiddleware.service';
import { StoryManageService } from 'src/app/story-manage.service';

@Component({
  selector: 'app-content-body',
  templateUrl: './content-body.component.html',
  styleUrls: ['./content-body.component.css']
})
export class ContentBodyComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private post:CreatePostService,
    private storymanage:StoryManageService,
    private route:Router ,
    private userservice : UsermiddlewareService,
    private toastr:ToastrService,
    private friend:FriendrelationshipService
  ) { }

  likecounts=0;

@ViewChild('createPostModalClose') createPostModalClose:any;
@ViewChild('postupdateModalClose') postupdateModalClose:any;
  public createPost = this.fb.group({
    'status':'',
    'post':'',
    'id':''
  })
  public UpdatePost = this.fb.group({
    'status':'',
    'post':'',
    'id':''
  })
  allPosts:any;
  @ViewChild('comment') commentfocus : ElementRef | any;

  data:any;
  url:any;
  ngOnInit(): void {
    
      this.userservice.currentLoginUser.subscribe( (res: any) =>{
        console.log(res);
        this.data=res;
        if(this.data){
          this.getAllFriendsId();
        }
      });
      
      console.log(this.data);
      // this.getpost();
      // this.getstories();
    // console.log(this.route.url);
    this.url=this.route.url;
 
  }

  imageSrc:any;
  updatesrc:any;
  file:any;

  onFilePostChange(e:any) {
    if(e.target.files){
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event:any)=>{  
        this.file=e.target.files[0];
        console.log(this.file)
        // console.log(this.imageSrc)
        this.imageSrc = event.target.result;

      }

    }
  }
  onFileUpdatePostChange(e:any) {
    if(e.target.files){
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event:any)=>{  
        this.file=e.target.files[0];
        console.log(this.file)
        // console.log(this.imageSrc)
        this.updatesrc = event.target.result;

      }

    }
  }
  storysrc:any;
  onFilechangestory(e:any) {
    // console.log('hello');
    // console.log(e);
    if(e.target.files){
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event:any)=>{  
        this.file=e.target.files[0];
        // console.log(this.file)
        // console.log(this.imageSrc)
        this.storysrc = event.target.result;
        // console.log(this.storysrc);

      }

    }
  }

  createpostsuccess:any;
  posterr : any;
  oncreatepost(){

      let formdata = new FormData;
      formdata.append('status',this.createPost.get('status')?.value);
      formdata.append('user_id',this.data._id);
      formdata.append('postUrl',this.file);

        this.post.createPost(formdata).subscribe((res)=>{
          this.imageSrc = '';
          this.file='';
          this.createPost.reset();
          this.getUserFriendsPosts();
          this.createpostsuccess = res;
          this.posterr=null;
          console.log(res);
          this.toastr.success(this.createpostsuccess,'Success!')
          this.createPostModalClose.nativeElement.click();
        },(err)=>{

          this.posterr = err.error.errors.postUrl[0];
          this.createpostsuccess = null;
          console.log(err);
        })
  }


  getpost(){
    this.post.getpostData(this.data.id).subscribe(res=>{
   
        this.allPosts = res;
        // this.allPosts=this.allPosts.allDetails;
     console.log(this.allPosts);
      // this.allPosts=res;
    })
  }

  likestarted:boolean=false;
  onlike(post_id:any,user_id:any){
    this.likestarted=true

    let fdata = {
      "post_photo_id":post_id,
      "user_id":user_id,
      "userclick_id":this.data._id
    }
    this.post.likeorUnlike(fdata).subscribe(res=>{
      this.likestarted=false
      this.getUserFriendsPosts();
      console.log(res);
    })

  }
  moderdata:any
  onclick(item:any){
    this.moderdata=item;
    
  }
  deletePost(item:any){

    if(confirm("are you sure to Delete Post?")){
      this.post.deletePost(item._id).subscribe((res)=>{
        console.log("deletion done");
        this.getUserFriendsPosts();
      })
    }

  }
  updatepostsuccess:any;
  updateposterr : any;
  onUpdatepost(){

    let formdata = new FormData;
    formdata.append('status',this.UpdatePost.get('status')?.value);
    formdata.append('id',this.UpdatePost.get('id')?.value);
    if(this.file){
       formdata.append('postUrl',this.file);
    }
    
        this.post.updatePost(formdata).subscribe((res)=>{
          this.updatesrc = '';
          this.file='';
          this.UpdatePost.reset();
          this.getUserFriendsPosts();
          this.updatepostsuccess = res;
          this.updateposterr=null;
          console.log(res);
          this.toastr.success(this.updatepostsuccess,'Success!')
          this.postupdateModalClose.nativeElement.click();
        },(err)=>{
          this.updateposterr=err.error;
          this.updatepostsuccess = null;
          console.log(err);
        })
  }
  edit(item:any){
    console.log(item);

    this.UpdatePost.patchValue({
      "status":item.status,
      'id':item._id
    })
    this.updatesrc="http://localhost:2000"+item.postUrl;
  }

  comment:any=[];
  checkcomment:boolean = false;
  checkpostid:any;
  oncomments(item:any){

    if(this.comment.includes(item._id)){

      this.comment.forEach((value: number,index: any)=>{
        if(value==item._id) this.comment.splice(index,1);
     })
    }else{
      this.checkpostid=item._id;
      this.comment.push(item._id);
    }
    this.addComments='';
    this.commentEmojiPicker=false
    // this.comment=item.id;
    // this.comment =! this.comment;
  }
  addcomment(item:any){

    if(this.comment.includes(item._id)){

    }else{
      this.comment.push(item._id);

    }
    this.checkpostid=item._id;
      this.addComments='';
      setTimeout(() => {
        this.commentfocus.nativeElement.focus();

      }, 0);

    // this.comment =! this.comment;
  }

  createcomment(comment:any,item:any){
    
    console.log(item);

    
    let fdata = {
      "comment":comment.value,
      "post_photo_id":item._id,
      "user_id":item.postUser._id,
      "usercomment_id":this.data._id
    }
    
    this.post.createcomment(fdata).subscribe((res)=>{
      comment.value="";
      this.addComments='';
      this.getUserFriendsPosts();
      console.log(res);
    },(err)=>{
      console.log(err);
    });

  }
  
  deleteComment(cid:number,pid:number){

   if(confirm('Are You Sure You Want to Delete Comment ?')){
    this.post.deletcomment(cid,pid).subscribe((res)=>{
      console.log(res);
      this.getUserFriendsPosts();
    },err=>{
      console.log(err);
    })

   }
  }


  oncreatestory(){

    let formdata = new FormData;
    // formdata.append('storyText',this.createPost.get('storyText')?.value);
    formdata.append('user_id',this.data._id);
    formdata.append('storyUrl',this.file);

      this.storymanage.createstory(formdata).subscribe((res)=>{
        this.storysrc = '';
        this.file='';
        // this.createPost.reset();
        this.getUserFriendsPosts();
        // this.createpostsuccess = res;
        // this.posterr=null;
        console.log(res);
        // this.getstories();
      },(err)=>{

        // this.posterr = err.error.errors.postUrl[0];
        // this.createpostsuccess = null;
        console.log(err);
      })
}


allstory:any;
userstory:any;

  // getstories(){
  //   this.storymanage.getstory(this.data.id).subscribe((res)=>{
  //     console.log(res);
  //     this.allstory=res;
  //     this.userstory=this.allstory.userstories;
  //     this.allstory=this.allstory=this.allstory.allStories;
  //     console.log(this.userstory);
  //     console.log(this.allstory); 
  //   },(err)=>{
  //     console.log(err);
  //   })
  // }
 
  // this is For Emoji Pickers
  

  onFocus() {
    console.log('focus');
    this.commentEmojiPicker2 = false;
    this.createPostEmojiPicker = false;
    this.UpdatePostEmojiPicker = false;
    this.commentEmojiPicker = false;

  }


  //Emoji for Create Post 
  addstatus:any = "";
  commentEmojiPicker2:boolean=false;
  createPostEmojiPicker:boolean=false;

  toggleEmojiPicker() {
    console.log(this.commentEmojiPicker2);
    this.commentEmojiPicker2 = !this.commentEmojiPicker2;
  }
  createPostToggleEmojiPicker() {
    console.log(this.commentEmojiPicker2);
    this.createPostEmojiPicker = !this.createPostEmojiPicker;
  }
  addEmoji(event:any){
    const addstatus = this.addstatus;
    console.log(event.emoji.native);
    const text = addstatus+event.emoji.native;

    this.addstatus = text;
    this.createPost.patchValue({
      'status':this.createPost.get('status')?.value+event.emoji.native

    }
    )
    // this.commentEmojiPicker2 = false;
    // createPostEmojiPicker:boolean=false;
  }

  
  // EMoji For Update Post 
  UpdatePostEmojiPicker:boolean=false;

  UpdateTogglePostEmojiPicker() {
    console.log(this.commentEmojiPicker2);
    this.UpdatePostEmojiPicker = !this.UpdatePostEmojiPicker;
  }
  addEmojiUP(event:any){
   
    this.UpdatePost.patchValue({
      'status':this.UpdatePost.get('status')?.value+event.emoji.native

    }
    )
    // this.UpdatePostEmojiPicker = false;
  }


  //Emoji for comments 
  addComments:any="";
  commentEmojiPicker:boolean=false;

  commentToggleEmojiPicker() {
    console.log(this.commentEmojiPicker2);
    this.commentEmojiPicker = !this.commentEmojiPicker;
  }
  addEmojiUPOnComment(event:any){
    const addComments = this.addComments
    const text = addComments+event.emoji.native;
    this.addComments = text;
   
    // this.commentEmojiPicker = false;
  }
  
  friends:any;
  friendsId:Array<any>=[];

  getAllFriendsId(){

this.friend.getUseFriends(this.data._id).subscribe(res=>{
      this.friends=res;
      console.log(this.friends);

      if(this.friends){
        this.friends=this.friends.user_Friends;
        this.friendsId.push(this.data._id);
      for(let i=0;i<this.friends.length;i++){
        this.friendsId.push(this.friends[i].friend_id._id);
      }
      console.log(this.friendsId);
      this.getUserFriendsPosts();
      
      }

    },err=>{
      console.log(err);
    })
  }

  
  getUserFriendsPosts(){
    this.friend.getAllFriendsPost(this.friendsId).subscribe(res=>{
      this.allPosts=res;
      console.log(this.allPosts);

    },err=>{
      console.log(err);
    })
  }

  CheckUserLike(json:any, ids:any){
  
    let hasMatch =false;
  for (let index = 0; index < json.length; ++index) {

    let jsoncheck = json[index];
    if(jsoncheck.userclick_id._id == ids){
      hasMatch = true;
      break;
   }
  }
  return hasMatch;

}
 
}
