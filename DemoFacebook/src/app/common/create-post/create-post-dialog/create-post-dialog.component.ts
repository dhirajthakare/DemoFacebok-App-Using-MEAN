import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
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
    private fb: UntypedFormBuilder,
    private post: PostService,
    private toastService: ToastrService,
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
    let cropsImgPreview:any = event.base64;
    let File = base64ToFile(cropsImgPreview);
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

  createPostSuccess: any;
  postError: any;
  onCreatePost() {
    let formData = new FormData();
    formData.append('status', this.createPost.get('status')?.value);
    formData.append('user_id', this.data._id);
    formData.append('postUrl', this.file);

    this.post.createPost(formData).subscribe(
      (res) => {
        this.file = '';
        this.createPost.reset();
        this.createPostSuccess = res;
        this.postError = null;
        this.toastService.success(this.createPostSuccess, 'Success!');
        this.dialogRef.close();
      },
      (err) => {
        this.postError = err.error;
        this.createPostSuccess = null;
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

  closeDialog(){
    this.dialogRef.close(this.createPost.get('status')?.value);
  }
  
}
