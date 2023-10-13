import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/common/services/auth.service';
import { SharedDataService } from 'src/app/common/services/shared-data.service';

@Component({
  selector: 'app-account-create-dialog',
  templateUrl: './account-create-dialog.component.html',
  styleUrls: ['./account-create-dialog.component.scss'],
})
export class AccountCreateDialogComponent implements OnInit {
  constructor(
    public service: AuthService,
    private formbuilder: FormBuilder,
    private toast: ToastrService,
    private dialogRef: MatDialogRef<AccountCreateDialogComponent>,
    private sharedservice:SharedDataService
  ) {}

  storeallerrors: any;

  ngOnInit(): void {}

  // onSubmit
  createAccountForm = this.formbuilder.group({
    fname: '',
    lname: '',
    email: '',
    password: '',
    birthOfDate: '',
    gender: '',
  });

  onSubmit() {
    this.createAccountForm.patchValue({
      "birthOfDate":this.sharedservice.getSelectedDate(this.createAccountForm.value,'birthOfDate')
    })
    this.service.createAcc(this.createAccountForm.value).subscribe(
      (res) => {
        this.toast.success('Successfully Created Acoount', 'Success!');
        this.storeallerrors = null;
        this.createAccountForm.reset();
        this.dialogRef.close();
      },
      (err) => {
        console.log(err);
        this.storeallerrors = err.error;
      }
    );
  }
}
