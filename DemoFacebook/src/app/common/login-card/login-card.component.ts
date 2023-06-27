import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountCreateDialogComponent } from 'src/app/modules/login/account-create-login/account-create-dialog/account-create-dialog.component';
import { AuthService } from '../services/auth.service';
import { LoginError } from '../interface/user,inteface';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
})
export class LoginCardComponent implements OnInit {
  loginsuccess!: string;
  loginerr!: LoginError | null;
  token: any;
  loginForm = this.formbuilder.group({
    email: 'mayur@gmail.com',
    password: '12345678',
  });
  constructor(
    public service: AuthService,
    private formbuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.formbuilder.group({
      email: 'mayur@gmail.com',
      password: '12345678',
    });
  }

  onlogin() {
    this.service.LoginAcc(this.loginForm.value).subscribe(
      (res) => {
        this.loginsuccess = 'login Successfully';
        this.token = res;
        localStorage.setItem('accountToken', this.token);
        this.loginerr = null;
        this.router.navigate(['deskbook']);
      },
      (err) => {
        console.log(err);
        this.loginerr = err.error;
      }
    );
  }

  openAccountCreateDialog() {
    this.dialog.open(AccountCreateDialogComponent);
  }
}
