import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';
import { SharedDataService } from 'src/app/common/services/shared-data.service';
import { AccountCreateDialogComponent } from './account-create-dialog/account-create-dialog.component';

@Component({
  selector: 'app-account-create-login',
  templateUrl: './account-create-login.component.html',
  styleUrls: ['./account-create-login.component.scss']
})
export class AccountCreateLoginComponent implements OnInit {

  regsuccess:any
  regerr:any;
  loginsuccess:any;
  loginerr:any;
  storeallerrors:any;
constructor(
  public service : AuthService,
  private formbuilder : FormBuilder,
  private router : Router,
  private comman:SharedDataService ,
  private dialog : MatDialog
) { }

sessionerror:any
ngOnInit(): void {
  this.comman.changeTitle('Login Accont');
     
}

  // On Login

  loginForm =  this.formbuilder.group({
    'email':'mayur@gmail.com',
    'password':'v123456',


})
token:any;
onlogin(){
 this.service.LoginAcc(this.loginForm.value).subscribe((res)=>{

   this.loginsuccess="login Successfully";
   console.log(res);
    this.token = res;

    localStorage.setItem('accountToken',this.token.userToken);
    this.loginerr=null;
    localStorage.setItem('loggedin',"true");
    this.router.navigate(['deskbook']);
   
 },(err)=>{
   console.log(err);
   this.loginerr = err.error;
 })
}

openAccountCreateDialog(){
let diaRefrence = this.dialog.open(AccountCreateDialogComponent);
}


}
