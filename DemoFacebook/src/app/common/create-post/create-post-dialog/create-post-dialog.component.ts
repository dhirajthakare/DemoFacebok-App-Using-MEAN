import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
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

  file: any;
  imageChangeEvt: any = '';
  public createPost = this.fb.group({
    status: this.data.addStatus,
    post: '',
    id: '',
  });

  ngOnInit(): void {}

  onFilePostChange(e: any) {
    this.file = e.target.files[0];
    this.imageChangeEvt = e;
  }

  cropImg(event: ImageCroppedEvent) {
    let croppImgPriview:any = event.base64;
    let File = base64ToFile(croppImgPriview);
    this.file = this.blobToFile(File, this.file.name);

  }

  public blobToFile = (theBlob: Blob, fileName: string): File => {
    return new File(
      [theBlob as any], // cast as any
      fileName,
      {
        lastModified: new Date().getTime(),
        type: theBlob.type,
      }
    );
  };

  createpostsuccess: any;
  posterr: any;
  oncreatepost() {
    let formdata = new FormData();
    formdata.append('status', this.createPost.get('status')?.value);
    formdata.append('user_id', this.data._id);
    formdata.append('postUrl', this.file);

    this.post.createPost(formdata).subscribe(
      (res) => {
        this.file = '';
        this.createPost.reset();
        this.createpostsuccess = res;
        this.posterr = null;
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
