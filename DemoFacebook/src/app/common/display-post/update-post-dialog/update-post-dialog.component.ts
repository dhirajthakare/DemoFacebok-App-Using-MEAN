import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../../services/post.service';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-update-post-dialog',
  templateUrl: './update-post-dialog.component.html',
  styleUrls: ['./update-post-dialog.component.scss'],
})
export class UpdatePostDialogComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private post: PostService,
    private toastService: ToastrService,
    private sharedService: SharedDataService,
    public dialogRef: MatDialogRef<UpdatePostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.edit(this.data);
  }

  public UpdatePost = this.fb.group({
    status: '',
    post: '',
    id: '',
  });

  @ViewChild('postUpdateModalClose') postUpdateModalClose: any;

  updatepostsuccess: any;
  updateposterr: any;
  imageSrc: any;
  updatesrc: any;
  file: any;

  onUpdatepost() {
    let formData = new FormData();
    formData.append('status', this.UpdatePost.get('status')?.value);
    formData.append('id', this.UpdatePost.get('id')?.value);
    if (this.file) {
      formData.append('postUrl', this.file);
    }

    this.post.updatePost(formData).subscribe(
      (res) => {
        this.file = '';
        this.UpdatePost.reset();
        this.sharedService.postSavedSource.next(true);
        this.updatepostsuccess = res;
        this.updateposterr = null;
        this.toastService.success(this.updatepostsuccess, 'Success!');
        this.dialogRef.close();
      },
      (err) => {
        this.updateposterr = err.error;
        this.updatepostsuccess = null;
        console.log(err);
      }
    );
  }

  edit(item: any) {
    this.UpdatePost.patchValue({
      status: item.status,
      id: item._id,
    });
    this.updatesrc = 'http://localhost:2000' + item.postUrl;
  }

  imageChangeEvt:any;
  onFileUpdatePostChange(e: any) {
    this.file = e.target.files[0];
    this.imageChangeEvt = e;
    this.updatesrc = '';

    //for get selcted Image Source
    // if (e.target.files) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(e.target.files[0]);
    //   reader.onload = (event: any) => {
    //     let imageScrc = event.target.result;
    //   };
    // }
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

  updatePostEmojiPicker: boolean = false;

  updatePostToggleEmojiPicker() {
    this.updatePostEmojiPicker = !this.updatePostEmojiPicker;
  }

  onFocus() {
    this.updatePostEmojiPicker = false;
  }

  addEmojiUP(event: any) {
    this.UpdatePost.patchValue({
      status: this.UpdatePost.get('status')?.value + event.emoji.native,
    });
  }
}
