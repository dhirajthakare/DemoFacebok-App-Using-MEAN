import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommanValuesService } from 'src/app/services/comman-values.service';
import { CreateloginserviceService } from 'src/app/services/createloginservice.service';
import { AccountCreateDialogComponent } from './account-create-dialog/account-create-dialog.component';

@Component({
  selector: 'app-account-create-login',
  templateUrl: './account-create-login.component.html',
  styleUrls: ['./account-create-login.component.css']
})
export class AccountCreateLoginComponent implements OnInit {

  regsuccess:any
  regerr:any;
  loginsuccess:any;
  loginerr:any;
  storeallerrors:any;
constructor(
  public service : CreateloginserviceService,
  private formbuilder : FormBuilder,
  private router : Router,
  private comman:CommanValuesService ,
  private dialog : MatDialog
) { }

sessionerror:any
ngOnInit(): void {
  this.sessionerror=localStorage.getItem('error');
  console.log(this.sessionerror);
     
}

// onSubmit 
  createAccountForm =  this.formbuilder.group({
      'fname':'',
      'lname':'',
      'email':'',
      'password':'',
      'birthOfDate':'',
      'gender':'',

  })


onSubmit(){
  console.log(this.createAccountForm.value);
 
  this.service.createAcc(this.createAccountForm.value).subscribe((res)=>{
    console.log(res);
    this.regsuccess="Successfully Created Account ";
    this.storeallerrors=null;
    this.createAccountForm.reset();
  },(err)=>{

    console.log(err);

    this.regsuccess=null;
    this.storeallerrors = err.error;
    console.log(this.storeallerrors)
   
  })
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
  //  token = token.id;
  //  console.log(this.token.userToken);

    localStorage.setItem('accountToken',this.token.userToken);
    this.loginerr=null;
    localStorage.setItem('loggedin',"true");
    localStorage.removeItem('error');
    this.router.navigate(['deskbook']);
   
 },(err)=>{
   console.log(err);
   console.log(err.error)
   console.log(err.error.message)


   this.loginerr = err.error;
  //  if(!err.error){
  //    this.loginerr=err
  //  }else if(!err.error.message){
  //   this.loginerr=err.error

  //  }else 
  //  this.loginerr=err.error.message;

  //  this.loginsuccess=null
 })
}

openAccountCreateDialog(){
let diaRefrence = this.dialog.open(AccountCreateDialogComponent, { data:{
  Name:'Dhiraj',
  Sirname:'Thakare'
}});
}

}
