import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateloginserviceService } from 'src/app/services/createloginservice.service';
import { FriendrelationshipService } from 'src/app/services/friendrelationship.service';
import { UsermiddlewareService } from 'src/app/services/usermiddleware.service';
import { MainComponent } from '../main.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    @ViewChild('searcharea') searcharea!:ElementRef;
    @ViewChild('updateModalClose') updateModalClose:any;

    updateerr:any;
    updatesuccess:any;
    Profilesrc:any;

  constructor( 
    private formbuilder:FormBuilder ,
    private AccountD:CreateloginserviceService,
    private navicateRoute : Router,
    private friendship:FriendrelationshipService,
    private userservice:UsermiddlewareService,
    private toastr:ToastrService

     ) { }

    // onSubmit 
    
    createAccountForm =  this.formbuilder.group({
      'fname':'',
      'lname':'',
      'profile':'',
      'birthOfDate':'',
      'gender':'',

  })

  
  data:any;
  ngOnInit(): void {
    
    this.userservice.currentLoginUser.subscribe( (res: any) =>{
      console.log(res);
      this.data=res;
      if(this.data){
        this.setupdatevalue();
      }
    });
   

    
  }

  file:any;
  onFileChange(e:any) {
    if(e.target.files){
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event:any)=>{  
        this.file=e.target.files[0];
        console.log(this.file)
        this.Profilesrc = event.target.result;

      }

    }
  }

  updateUser(){
    // this.AccountD.
  let formdata = new FormData();
  formdata.append('fname',this.createAccountForm.get('fname')?.value)
  formdata.append('lname',this.createAccountForm.get('lname')?.value)
  formdata.append('profile',this.file);
  formdata.append('birthOfDate',this.createAccountForm.get('birthOfDate')?.value)
  formdata.append('gender',this.createAccountForm.get('gender')?.value)

  this.AccountD.updateUser(formdata,this.data._id).subscribe(res=>{
    this.updatesuccess="Update Data Successfully";
    console.log(res);
    this.updateerr=null;
    this.userservice.currentLoginUser.next(res);
    this.toastr.success('Profile Updated SucceesFully ','Success!')
    this.updateModalClose.nativeElement.click();

    // window.location.reload()

  },err=>{
    this.updatesuccess=null;
    this.updateerr = err.error;
    console.log(err);
  })


  }
  setupdatevalue(){
    let arr = this.data.name.split("  ");
    console.log(arr);
    this.createAccountForm.patchValue({
         'fname':arr[0],
          'lname':arr[arr.length-1],
          'profile':'',
          'birthOfDate':this.data.birthOfDate,
          'gender':this.data.gender,
    })  

    if(this.data.profileUrl){
      this.Profilesrc="http://localhost:2000"+this.data.profileUrl;
    }else{
      this.Profilesrc = 'http://localhost:2000/assets/images/userdefault.png';
    }
    

}
logout(){

  if(confirm("Are You sure You Want To Logout ? ")){
    localStorage.removeItem('loggedin');
   this.navicateRoute.navigate(['']);
  }

}

onFocus(){
  this.friendship.searchBoxVisibility.next(true);
  this.friendship.inputblur.next(true);
}
onblur(){
  // this.friendship.searchBoxVisibility.next(false);
  setTimeout(() => {
    this.friendship.searchBoxVisibility.next(false);
  }, 400);
}

searchFriends(item:any){
// console.log(item.value);
this.friendship.serchbox.next(item.value);
}


}
