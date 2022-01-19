import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreatePostService } from 'src/app/services/create-post.service';
import { ShareServiceService } from 'src/app/services/share-service.service';
import { UsermiddlewareService } from 'src/app/services/usermiddleware.service';

@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.component.html',
  styleUrls: ['./create-post-dialog.component.css']
})
export class CreatePostDialogComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private post: CreatePostService,
    private toastr: ToastrService,
    private sharedService: ShareServiceService,
    private dialogRef : MatDialogRef<CreatePostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,


  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  

  
  @ViewChild('createPostModalClose') createPostModalClose: any;
  addstatus: any = this.data.addstatus;


  public createPost = this.fb.group({
    'status': '',
    'post': '',
    'id': ''
  });

  updatepostsuccess: any;
  updateposterr: any;
  imageSrc: any;
  updatesrc: any;
  file: any;
  onFilePostChange(e: any) {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.file = e.target.files[0];
        console.log(this.file)
        // console.log(this.imageSrc)
        this.imageSrc = event.target.result;

      }

    }
  }
  createpostsuccess: any;
  posterr: any;
  oncreatepost() {

    let formdata = new FormData;
    formdata.append('status', this.createPost.get('status')?.value);
    formdata.append('user_id', this.data._id);
    formdata.append('postUrl', this.file);

    this.post.createPost(formdata).subscribe((res) => {
      this.imageSrc = '';
      this.file = '';
      this.createPost.reset();
      // this.getpost();
      this.createpostsuccess = res;
      this.posterr = null;
      console.log(res);
      this.toastr.success(this.createpostsuccess, 'Success!');
      this.dialogRef.close(this.createPost.get('status')?.value);
      this.sharedService.postSavedSource.next(true)
    }, (err) => {

      this.posterr = err.error.errors.postUrl[0];
      this.createpostsuccess = null;
      console.log(err);
    })
  }





  // this is form Emoji Picker of Create Post 
  showEmojiPicker1: boolean = false;



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
    this.commentEmojiPicker2 = false;

  }


  addEmoji(event: any) {
    console.log(event.emoji.native);

    this.createPost.patchValue({
      'status': this.createPost.get('status')?.value + event.emoji.native

    }
    )
    // this.showEmojiPicker = false;
  }

    //Emoji for Create Post 
    commentEmojiPicker2: boolean = false;
    createPostEmojiPicker: boolean = false;
  
    toggleEmojiPicker() {
      console.log(this.commentEmojiPicker2);
      this.commentEmojiPicker2 = !this.commentEmojiPicker2;
    }

}
