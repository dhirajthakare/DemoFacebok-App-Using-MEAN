import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountCreateLoginComponent } from './account-create-login/account-create-login.component';
import { EnterNewPasswordComponent } from './enter-new-password/enter-new-password.component';
import { EnterRecoverCodeComponent } from './enter-recover-code/enter-recover-code.component';
import { FindYourAccountPageComponent } from './find-your-account-page/find-your-account-page.component';
import { LoginComponent } from './login.component';
import { RecoverComponent } from './recover/recover.component';

const routes: Routes = [
  {path:'' , data: { title: 'Login Account' }, component:LoginComponent , children:[
    {path:'' , component:AccountCreateLoginComponent},
    {path:'recover' , component:RecoverComponent, children:[
      {path:'' , component:FindYourAccountPageComponent},
      {path:'code' , component:EnterRecoverCodeComponent},
      {path:'password' , component:EnterNewPasswordComponent},
    ] }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
