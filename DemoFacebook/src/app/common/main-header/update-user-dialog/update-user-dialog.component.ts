import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

  
  updateerr: any;
  updatesuccess: any;
  Profilesrc: any;
  file: any;
  data: any;
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private formbuilder: FormBuilder,
    private Authservice: AuthService,
    private userservice: UserService,
    private toastr: ToastrService,
    private dialogRef : MatDialogRef<UpdateUserDialogComponent>,
    private sharedservice:SharedDataService
  ) {}


  createAccountForm = this.formbuilder.group({
    fname: '',
    lname: '',
    profile: '',
    birthOfDate: '',
    gender: '',
  });

  ngOnInit(): void {
    this.userservice.currentLoginUser.pipe(takeUntil(this.onDestroy$)).subscribe((res: any) => {
      if(res){
      console.log(res);
      this.data = res;
      if (this.data) {
        this.setupdatevalue();
      }
      }
    });
  }

  onFileChange(e: any) {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.file = e.target.files[0];
        console.log(this.file);
        this.Profilesrc = event.target.result;
      };
    }
  }

  updateUser() {
    // this.Authservice.
    let formdata = new FormData();
    formdata.append('fname', this.createAccountForm.get('fname')?.value);
    formdata.append('lname', this.createAccountForm.get('lname')?.value);
    formdata.append('profile', this.file);
    formdata.append(
      'birthOfDate',
      this.createAccountForm.get('birthOfDate')?.value
    );
    formdata.append('gender', this.createAccountForm.get('gender')?.value);

    this.Authservice.updateUser(formdata, this.data._id).subscribe(
      (res) => {
        this.updatesuccess = 'Update Data Successfully';
        console.log(res);
        this.updateerr = null;
        this.sharedservice.updatedUserDetails.next(true);
        this.toastr.success('Profile Updated SucceesFully ', 'Success!');
        this.dialogRef.close();
      },
      (err) => {
        this.updatesuccess = null;
        this.updateerr = err.error;
        console.log(err);
      }
    );
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