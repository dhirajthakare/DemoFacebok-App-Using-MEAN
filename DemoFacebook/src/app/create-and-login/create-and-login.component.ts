import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommanValuesService } from '../services/comman-values.service';
import { CreateloginserviceService } from '../services/createloginservice.service';

@Component({
  selector: 'app-create-and-login',
  templateUrl: './create-and-login.component.html',
  styleUrls: ['./create-and-login.component.css']
})
export class CreateAndLoginComponent implements OnInit {

    regsuccess:any
    regerr:any;
    loginsuccess:any;
    loginerr:any;
    storeallerrors:any;
  constructor(
    public service : CreateloginserviceService,
    private formbuilder : FormBuilder,
    private router : Router,
     private comman:CommanValuesService
  ) { }
  
  sessionerror:any
  ngOnInit(): void {
    this.sessionerror=localStorage.getItem('error');
      if(localStorage.getItem('loggedin')=="true"){
        this.router.navigate(['/facebook']);

      }
      
    
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
      this.loginForm.reset();
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
      this.router.navigate(['facebook']);
     
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



}
