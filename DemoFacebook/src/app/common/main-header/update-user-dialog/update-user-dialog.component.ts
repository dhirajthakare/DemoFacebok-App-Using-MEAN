import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { SharedDataService } from '../../services/shared-data.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.scss']
})
export class UpdateUserDialogComponent implements OnInit {


  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private toastService: ToastrService,
    private dialogRef : MatDialogRef<UpdateUserDialogComponent>,
    private sharedService:SharedDataService
  ) {}


  updateError: any;
  updateSuccess: any;
  profileSrc: any;
  file: any;
  data: any;
  private onDestroy$: Subject<void> = new Subject<void>();
  imageChangeEvt:any;

  createAccountForm = this.fb.group({
    fname: '',
    lname: '',
    profile: '',
    birthOfDate: '',
    gender: '',
  });

  ngOnInit(): void {
    this.userService.currentLoginUser.pipe(takeUntil(this.onDestroy$)).subscribe((res: any) => {
      if(res){
      this.data = res;
      if (this.data) {
        this.setUpdateValue();
      }
      }
    });
  }

  onFileChange(e: any) {
    this.imageChangeEvt = e;
    this.file = e.target.files[0];
    this.profileSrc = '';
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

  updateUser() {
    // this.authService.
    let formData = new FormData();
    formData.append('fname', this.createAccountForm.get('fname')?.value);
    formData.append('lname', this.createAccountForm.get('lname')?.value);
    formData.append('profile', this.file);
    formData.append(
      'birthOfDate',
      this.Changebirth?this.sharedService.getSelectedDate(this.createAccountForm.value,'birthOfDate'):this.data.birthOfDate
    );
    formData.append('gender', this.createAccountForm.get('gender')?.value);

    this.authService.updateUser(formData, this.data._id).subscribe(
      (res) => {
        this.updateSuccess = 'Update Data Successfully';
        this.updateError = null;
        this.sharedService.updatedUserDetails.next(true);
        this.toastService.success('Profile Updated SuccessFully ', 'Success!');
        this.dialogRef.close();
      },
      (err) => {
        this.updateSuccess = null;
        this.updateError = err.error;
        console.log(err);
      }
    );
  }
  Changebirth:boolean = false;
  changeDate(){
    this.Changebirth = true;
  }

  setUpdateValue() {
    let arr = this.data.name.split('  ');
    this.createAccountForm.patchValue({
      fname: arr[0],
      lname: arr[arr.length - 1],
      profile: '',
      birthOfDate: this.data.birthOfDate,
      gender: this.data.gender,
    });

    if (this.data.profileUrl) {
      this.profileSrc = 'http://localhost:2000' + this.data.profileUrl;
    } else {
      this.profileSrc = 'http://localhost:2000/assets/images/userdefault.png';
    }
  }
  
  ngOnDestroy() {
    this.onDestroy$.next();
  }

}