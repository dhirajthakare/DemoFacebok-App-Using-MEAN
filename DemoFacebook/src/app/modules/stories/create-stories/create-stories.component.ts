import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { StoriesService } from 'src/app/common/services/stories.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-create-stories',
  templateUrl: './create-stories.component.html',
  styleUrls: ['./create-stories.component.scss'],
})
export class CreateStoriesComponent implements OnInit {
  constructor(
    private userService: UserService,
    private storyManage: StoriesService,
    private router: Router,
    private toastService: ToastrService,
    private location: Location
  ) {}
  loginUserDetails: any;
  storySrc: any;
  file: any;
  imageChangeEvt:any;
  destroySubject: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.userService.currentLoginUser
      .pipe(takeUntil(this.destroySubject))
      .subscribe((res: any) => {
        if (res) {
          this.loginUserDetails = res;
        }
      });
  }

  onFileChangeStory(e: any) {
    this.imageChangeEvt = e;
    this.file = e.target.files[0];
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.storySrc = event.target.result;
      };
    }
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


  onCreateStory() {
    let formData = new FormData();
    formData.append('user_id', this.loginUserDetails._id);
    formData.append('storyUrl', this.file);

    this.storyManage.createStory(formData).subscribe(
      (res) => {
        this.storySrc = '';
        this.file = '';
        this.toastService.success('Story Created Successfully ', 'Success!');
        this.location.back();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnDestroy() {
    this.destroySubject.next();
  }
}
