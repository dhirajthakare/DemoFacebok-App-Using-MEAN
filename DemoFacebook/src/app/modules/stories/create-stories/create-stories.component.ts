import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { StorieService } from 'src/app/common/services/storie.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-create-stories',
  templateUrl: './create-stories.component.html',
  styleUrls: ['./create-stories.component.scss'],
})
export class CreateStoriesComponent implements OnInit {
  constructor(
    private userservice: UserService,
    private storymanage: StorieService,
    private router: Router,
    private toastr: ToastrService,
    private location: Location
  ) {}
  loginUserDetails: any;
  storysrc: any;
  file: any;
  imageChangeEvt:any;
  destoy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.userservice.currentLoginUser
      .pipe(takeUntil(this.destoy$))
      .subscribe((res: any) => {
        if (res) {
          this.loginUserDetails = res;
        }
      });
  }

  onFilechangestory(e: any) {
    this.imageChangeEvt = e;
    this.file = e.target.files[0];
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.storysrc = event.target.result;
      };
    }
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


  oncreatestory() {
    let formdata = new FormData();
    formdata.append('user_id', this.loginUserDetails._id);
    formdata.append('storyUrl', this.file);

    this.storymanage.createstory(formdata).subscribe(
      (res) => {
        this.storysrc = '';
        this.file = '';
        this.toastr.success('Story Created Successfully ', 'Success!');
        this.location.back();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnDestroy() {
    this.destoy$.next();
  }
}
