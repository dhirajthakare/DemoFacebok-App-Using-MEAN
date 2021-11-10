import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { take, toArray } from 'rxjs/operators';
import { CreatePostService } from '../services/create-post.service';
import { UsermiddlewareService } from '../services/usermiddleware.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private post:CreatePostService,
    private route:Router,
    private userservice:UsermiddlewareService,
    private toastr:ToastrService
  ) { }


  allPosts:any;
  data:any;
  url:any;
  
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
  @ViewChild('comment') commentfocus : ElementRef | any;
  @ViewChild('postUpdateModalClose') postUpdateModalClose:any;

  ngOnInit(): void {
    this.userservice.currentLoginUser.subscribe( (res: any) =>{
      console.log(res);
      this.data=res;
      if(this.data){
        this.oninitgetdata();
      }
    });
    
  console.log(this.data);
  this.url=this.route.url;
  }

  currentUser:any;
  oninitgetdata(){

    this.userservice.currentVisitedUser.subscribe((res: any)=>{
      this.currentUser = res;
      console.log(res);
      if(this.currentUser){
        this.getpost();
      }
    })
    
  }
  
  datasubtitle:any;
  getpost(){
    this.datasubtitle = this.userservice.getCurrentUserPost(this.currentUser._id,this.data._id).subscribe((res)=>{
        this.allPosts=res;
      console.log(res);
    },err=>{
      console.log(err);
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
      this.oninitgetdata();
      console.log(res);
    })

  }
  moderdata:any
  onclick(item:any){
    this.moderdata=item;
    console.log(this.moderdata)
    
  }
  deletePost(item:any){

    if(confirm("are you sure to Delete Post?")){
      this.post.deletePost(item._id).subscribe((res)=>{
        console.log("deletion done");
        this.getpost();
      })
    }

  }
  updatepostsuccess:any;
  updateposterr : any;
  imageSrc:any;
  updatesrc:any;
  file:any;

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
  createpostsuccess:any;
  posterr : any;
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
          this.getpost();
          this.updatepostsuccess = res;
          this.updateposterr=null;
          console.log(res);
          this.toastr.success(this.updatepostsuccess,'Success!')
        this.postUpdateModalClose.nativeElement.click();
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
      this.comment.push(item._id);
      this.checkpostid=item._id;

    }


    console.log(this.comment);
    this.addComments='';
    this.commentEmojiPicker=false;
    // this.comment=item.id;
    // this.comment =! this.comment;
  }
  addcomment(item:any){
    if(this.comment.includes(item._id)){

    }else{
      this.comment.push(item._id);

    }
    this.checkpostid=item._id;
    console.log(this.comment);


      this.addComments='';
      setTimeout(() => {
        this.commentfocus.nativeElement.focus();

      }, 0);

    // this.comment =! this.comment;
  }

  createcomment(comment:any,item:any){
    
    console.log(item);

  
    let dataf = {
    "comment":comment.value,
    "post_photo_id":item._id,
    "user_id":item.user_id,
    "usercomment_id":this.data._id


    }
    
    this.post.createcomment(dataf).subscribe((res)=>{
      comment.value="";
      this.addComments='';
      this.getpost();
      console.log(res);
    },(err)=>{
      console.log(err);
    });

  }
  
  deleteComment(cid:number,pid:number){

   if(confirm('Are You Sure You Want to Delete Comment ?')){
    this.post.deletcomment(cid,pid).subscribe((res)=>{
      console.log(res);
      this.getpost();
    },err=>{
      console.log(err);
    })

   }
  }

 
   updatePostEmojiPicker:boolean=false;
 
 
   updatePostToggleEmojiPicker() {
     this.updatePostEmojiPicker = !this.updatePostEmojiPicker;
   }
   // toggleEmojiPicker1(item:any) {
   //   console.log(item);
   //   console.log(this.showEmojiPicker);
   //   this.showEmojiPicker = !this.showEmojiPicker;
   // }
   onFocus() {

     this.updatePostEmojiPicker = false;
     this.commentEmojiPicker=false;
 
   }
 
   addEmojiUP(event:any){
     console.log(event.emoji.native);

     this.UpdatePost.patchValue({
       'status':this.UpdatePost.get('status')?.value+event.emoji.native
 
     }
     )
     // this.showEmojiPicker = false;
   }


   //Emoji for comments 
  addComments:any="";
  commentEmojiPicker:boolean=false;

  commentToggleEmojiPicker() {
    this.commentEmojiPicker = !this.commentEmojiPicker;
  }
  addEmojiUPOnComment(event:any){
    const addComments = this.addComments
    const text = addComments+event.emoji.native;
    this.addComments = text;
   
    // this.commentEmojiPicker = false;
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
