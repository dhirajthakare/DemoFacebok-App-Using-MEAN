import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { concat } from 'rxjs';
import { CreatePostService } from '../services/create-post.service';
import { ShareServiceService } from '../services/share-service.service';
import { UsermiddlewareService } from '../services/usermiddleware.service';
import { CreatePostDialogComponent } from './create-post-dialog/create-post-dialog.component';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private post: CreatePostService,
    private route: Router,
    private userservice: UsermiddlewareService,
    private userss: UsermiddlewareService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private sharedService: ShareServiceService
  ) { }
  data: any;
  ngOnInit(): void {
    this.data = localStorage.getItem('accountHolder');
    this.data = JSON.parse(this.data);

  }

  @ViewChild('createPostModalClose') createPostModalClose: any;

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
      this.createPostModalClose.nativeElement.click();
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
    addstatus: any = "";
    commentEmojiPicker2: boolean = false;
    createPostEmojiPicker: boolean = false;
  
    toggleEmojiPicker() {
      console.log(this.commentEmojiPicker2);
      this.commentEmojiPicker2 = !this.commentEmojiPicker2;
    }


    dialogRef:any;
  OpenDia() {
    this.dialogRef = this.dialog.open(CreatePostDialogComponent , {
      width: '600px',
      data: {...this.data , ...{addstatus:this.addstatus}}
    });

    this.dialogRef.afterClosed().subscribe((res:any) => {
      console.log(res);
      // this.animal = result;
      this.addstatus=res;
    });
  }

 


}

