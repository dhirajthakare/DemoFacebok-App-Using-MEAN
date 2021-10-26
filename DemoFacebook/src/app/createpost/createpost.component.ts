import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileComponent } from '../profile/profile.component';
import { CreatePostService } from '../services/create-post.service';
import { UsermiddlewareService } from '../services/usermiddleware.service';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private post:CreatePostService,
    private route:Router,
    private userservice:UsermiddlewareService,
    private profilec:ProfileComponent,
    private userss:UsermiddlewareService,
    private toastr:ToastrService
  ) { }
    data:any;
  ngOnInit(): void {
    this.data = localStorage.getItem('accountHolder');
    this.data = JSON.parse(this.data);
    
  }

  @ViewChild('createPostModalClose') createPostModalClose:any;

  public createPost = this.fb.group({
    'status':'',
    'post':'',
    'id':''
  });

  updatepostsuccess:any;
  updateposterr : any;
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
          // this.getpost();
          this.createpostsuccess = res;
          this.posterr=null;
          console.log(res);
          this.toastr.success(this.createpostsuccess,'Success!');
          this.createPostModalClose.nativeElement.click();
          this.profilec.ngOnInit();

        },(err)=>{

          this.posterr = err.error.errors.postUrl[0];
          this.createpostsuccess = null;
          console.log(err);
        })
  }


  
  public UpdatePost = this.fb.group({
    'status':'',
    'post':'',
    'id':''
  });

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

  
  // this is form Emoji Picker of Create Post 
  showEmojiPicker1:boolean=false;


 
  toggleEmojiPicker1() {
    this.showEmojiPicker1 = !this.showEmojiPicker1;
  }
  
  // toggleEmojiPicker1(item:any) {
  //   console.log(item);
  //   console.log(this.showEmojiPicker);
  //   this.showEmojiPicker = !this.showEmojiPicker;
  // }
  onFocus() {
    console.log('focus');
    this.showEmojiPicker1 = false;

  }
  addEmoji(event:any){
    console.log(event.emoji.native);

    this.createPost.patchValue({
      'status':this.createPost.get('status')?.value+event.emoji.native

    }
    )
    // this.showEmojiPicker = false;
  }

  
  


}

