import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountCreateDialogComponent } from 'src/app/modules/login/account-create-login/account-create-dialog/account-create-dialog.component';
import { AuthService } from '../services/auth.service';
import { LoginError } from '../interface/user.interface';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
})
export class LoginCardComponent implements OnInit {
  loginSuccess!: string;
  loginError!: LoginError | null;
  token: any;
  loginForm = this.fb.group({
    email: 'mayur@gmail.com',
    password: '12345678',
  });
  constructor(
    public service: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fb.group({
      email: 'mayur@gmail.com',
      password: '12345678',
    });
  }

  onLogin() {
    this.service.LoginAcc(this.loginForm.value).subscribe(
      (res) => {
        this.loginSuccess = 'login Successfully';
        this.token = res;
        localStorage.setItem('accountToken', this.token);
        this.loginError = null;
        this.router.navigate(['deskbook']);
      },
      (err) => {
        console.log(err);
        this.loginError = err.error;
      }
    );
  }

  openAccountCreateDialog() {
    this.dialog.open(AccountCreateDialogComponent);
  }
}
