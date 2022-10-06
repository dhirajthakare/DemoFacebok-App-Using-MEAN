import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.scss']
})
export class MainBodyComponent implements OnInit {

  
  constructor(
    private route:Router,
    private userservice:UserService
    ) { }
 data:any;
 ngOnInit(): void {
   
   if(localStorage.getItem('loggedin')!="true"){
     localStorage.setItem('error',"You need To Login")
     this.route.navigate(['']);
   }
   this.getcurrentuser();

 }

 token:any;
 getcurrentuser(){
   this.token =  localStorage.getItem('accountToken');
   this.userservice.getUser(this.token).subscribe(res=>{
     console.log(res);
     localStorage.setItem('accountHolder',JSON.stringify(res));
     this.userservice.currentLoginUser.next(res);
 });


}

}
