import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    private formbuilder: FormBuilder,
    private Authservice: AuthService,
    private userService: UserService,
    private toastService: ToastrService,
    private dialogRef : MatDialogRef<UpdateUserDialogComponent>,
    private sharedService:SharedDataService
  ) {}


  updateerr: any;
  updatesuccess: any;
  Profilesrc: any;
  file: any;
  data: any;
  private onDestroy$: Subject<void> = new Subject<void>();
  imageChangeEvt:any;

  createAccountForm = this.formbuilder.group({
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
        this.setupdatevalue();
      }
      }
    });
  }

  onFileChange(e: any) {
    this.imageChangeEvt = e;
    this.file = e.target.files[0];
    this.Profilesrc = '';
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

  updateUser() {
    // this.Authservice.
    let formdata = new FormData();
    formdata.append('fname', this.createAccountForm.get('fname')?.value);
    formdata.append('lname', this.createAccountForm.get('lname')?.value);
    formdata.append('profile', this.file);
    formdata.append(
      'birthOfDate',
      this.Changebirth?this.sharedService.getSelectedDate(this.createAccountForm.value,'birthOfDate'):this.data.birthOfDate
    );
    formdata.append('gender', this.createAccountForm.get('gender')?.value);

    this.Authservice.updateUser(formdata, this.data._id).subscribe(
      (res) => {
        this.updatesuccess = 'Update Data Successfully';
        this.updateerr = null;
        this.sharedService.updatedUserDetails.next(true);
        this.toastService.success('Profile Updated SucceesFully ', 'Success!');
        this.dialogRef.close();
      },
      (err) => {
        this.updatesuccess = null;
        this.updateerr = err.error;
        console.log(err);
      }
    );
  }
  Changebirth:boolean = false;
  changeDate(){
    this.Changebirth = true;
  }

  setupdatevalue() {
    let arr = this.data.name.split('  ');
    this.createAccountForm.patchValue({
      fname: arr[0],
      lname: arr[arr.length - 1],
      profile: '',
      birthOfDate: this.data.birthOfDate,
      gender: this.data.gender,
    });

    if (this.data.profileUrl) {
      this.Profilesrc = 'http://localhost:2000' + this.data.profileUrl;
    } else {
      this.Profilesrc = 'http://localhost:2000/assets/images/userdefault.png';
    }
  }
  
  ngOnDestroy() {
    this.onDestroy$.next();
  }

}