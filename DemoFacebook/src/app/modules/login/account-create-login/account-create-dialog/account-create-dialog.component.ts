import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CreateAccountField } from 'src/app/common/interface/user,inteface';
import { AuthService } from 'src/app/common/services/auth.service';
import { SharedDataService } from 'src/app/common/services/shared-data.service';

@Component({
  selector: 'app-account-create-dialog',
  templateUrl: './account-create-dialog.component.html',
  styleUrls: ['./account-create-dialog.component.scss'],
})
export class AccountCreateDialogComponent implements OnInit {
  storeAllErrors!: CreateAccountField | null;
  // onSubmit
  createAccountForm = this.fb.group({
    fname: '',
    lname: '',
    email: '',
    password: '',
    birthOfDate: '',
    gender: '',
  });
  constructor(
    public service: AuthService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private dialogRef: MatDialogRef<AccountCreateDialogComponent>,
    private sharedService: SharedDataService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.createAccountForm.patchValue({
      birthOfDate: this.sharedService.getSelectedDate(
        this.createAccountForm.value,
        'birthOfDate'
      ),
    });
    this.service.createAcc(this.createAccountForm.value).subscribe(
      (res) => {
        this.toast.success('Successfully Created Account', 'Success!');
        this.storeAllErrors = null;
        this.createAccountForm.reset();
        this.dialogRef.close();
      },
      (err) => {
        console.log(err);
        this.storeAllErrors = err.error;
      }
    );
  }
}
