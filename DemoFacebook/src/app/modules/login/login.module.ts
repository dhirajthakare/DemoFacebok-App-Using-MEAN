import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AccountCreateLoginComponent } from './account-create-login/account-create-login.component';
import { EnterNewPasswordComponent } from './enter-new-password/enter-new-password.component';
import { EnterRecoverCodeComponent } from './enter-recover-code/enter-recover-code.component';
import { FindYourAccountPageComponent } from './find-your-account-page/find-your-account-page.component';
import { RecoverComponent } from './recover/recover.component';
import { AccountCreateDialogComponent } from './account-create-login/account-create-dialog/account-create-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginCardModule } from 'src/app/common/login-card/login-card.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    LoginComponent,
    AccountCreateLoginComponent,
    EnterNewPasswordComponent,
    EnterRecoverCodeComponent,
    FindYourAccountPageComponent,
    RecoverComponent,
    AccountCreateDialogComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    LoginCardModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class LoginModule { }
