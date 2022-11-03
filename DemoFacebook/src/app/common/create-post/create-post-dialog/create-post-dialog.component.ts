import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../../services/post.service';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.component.html',
  styleUrls: ['./create-post-dialog.component.scss'],
})
export class CreatePostDialogComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private post: PostService,
    private toastr: ToastrService,
    private sharedService: SharedDataService,
    private dialogRef: MatDialogRef<CreatePostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  public createPost = this.fb.group({
    status: this.data.addstatus,
    post: '',
    id: '',
  });

  imageSrc: any;
  file: any;
  onFilePostChange(e: any) {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.file = e.target.files[0];
        console.log(this.file);
        // console.log(this.imageSrc)
        this.imageSrc = event.target.result;
      };
    }
  }
  createpostsuccess: any;
  posterr: any;
  oncreatepost() {
    let formdata = new FormData();
    formdata.append('status', this.createPost.get('status')?.value);
    formdata.append('user_id', this.data._id);
    formdata.append('postUrl', this.file);

    this.post.createPost(formdata).subscribe(
      (res) => {
        this.imageSrc = '';
        this.file = '';
        this.createPost.reset();
        this.createpostsuccess = res;
        this.posterr = null;
        console.log(res);
        this.toastr.success(this.createpostsuccess, 'Success!');
        this.dialogRef.close();
        this.sharedService.postSavedSource.next(true);
      },
      (err) => {
        this.posterr = err.error;
        this.createpostsuccess = null;
        console.log(err);
      }
    );
  }

  // this is form Emoji Picker of Create Post
  createPostEmojiPicker: boolean = false;

  toggleEmojiPicker1() {
    this.createPostEmojiPicker = !this.createPostEmojiPicker;
  }

  onFocus() {
    this.createPostEmojiPicker = false;
  }

  addEmoji(event: any) {
    this.createPost.patchValue({
      status: this.createPost.get('status')?.value + event.emoji.native,
    });
  }

  closedialog(){
    this.dialogRef.close(this.createPost.get('status')?.value);
  }
  
}
