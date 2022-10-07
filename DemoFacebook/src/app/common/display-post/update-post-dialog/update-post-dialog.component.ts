import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FriendService } from '../../services/friend.service';
import { PostService } from '../../services/post.service';
import { SharedDataService } from '../../services/shared-data.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-update-post-dialog',
  templateUrl: './update-post-dialog.component.html',
  styleUrls: ['./update-post-dialog.component.scss']
})
export class UpdatePostDialogComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private post: PostService,
    private route: Router,
    private userservice: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private friend:FriendService,
    private sharedService : SharedDataService,
    public dialogref : MatDialogRef<UpdatePostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit(): void {
    

    this.edit(this.data);
  }

  public UpdatePost = this.fb.group({
    'status': '',
    'post': '',
    'id': ''
  })

  @ViewChild('postUpdateModalClose') postUpdateModalClose: any;

  updatepostsuccess: any;
  updateposterr: any;
  imageSrc: any;
  updatesrc: any;
  file: any;

  onUpdatepost() {

    let formdata = new FormData;
    formdata.append('status', this.UpdatePost.get('status')?.value);
    formdata.append('id', this.UpdatePost.get('id')?.value);
    if (this.file) {
      formdata.append('postUrl', this.file);
    }

    this.post.updatePost(formdata).subscribe((res) => {
      this.updatesrc = '';
      this.file = '';
      this.UpdatePost.reset();
      this.sharedService.postSavedSource.next(true);
      this.updatepostsuccess = res;
      this.updateposterr = null;
      console.log(res);
      this.toastr.success(this.updatepostsuccess, 'Success!')
      this.dialogref.close();
    }, (err) => {
      this.updateposterr = err.error;
      this.updatepostsuccess = null;
      console.log(err);
    })
  }

  edit(item: any) {
    console.log(item);

    this.UpdatePost.patchValue({
      "status": item.status,
      'id': item._id
    })
    this.updatesrc = "http://localhost:2000" + item.postUrl;
  }

  onFileUpdatePostChange(e: any) {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.file = e.target.files[0];
        console.log(this.file)
        // console.log(this.imageSrc)
        this.updatesrc = event.target.result;

      }

    }
  }

  updatePostEmojiPicker: boolean = false;


  updatePostToggleEmojiPicker() {
    this.updatePostEmojiPicker = !this.updatePostEmojiPicker;
  }

  onFocus() {

    this.updatePostEmojiPicker = false;

  }

  addEmojiUP(event: any) {
    console.log(event.emoji.native);

    this.UpdatePost.patchValue({
      'status': this.UpdatePost.get('status')?.value + event.emoji.native

    }
    )
    // this.showEmojiPicker = false;
  }

}
