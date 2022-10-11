import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountCreateDialogComponent } from 'src/app/modules/login/account-create-login/account-create-dialog/account-create-dialog.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit {

  regsuccess:any
  regerr:any;
  loginsuccess:any;
  loginerr:any;
  storeallerrors:any;
constructor(
  public service : AuthService,
  private formbuilder : FormBuilder,
  private router : Router,
  private dialog : MatDialog
) { }

ngOnInit(): void {     
}
  // On Login

  loginForm =  this.formbuilder.group({
    'email':'mayur@gmail.com',
    'password':'12345678',
})

token:any;
onlogin(){
 this.service.LoginAcc(this.loginForm.value).subscribe((res)=>{

   this.loginsuccess="login Successfully";
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
