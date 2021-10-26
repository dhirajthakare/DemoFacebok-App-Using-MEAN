import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsermiddlewareService } from '../services/usermiddleware.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  constructor(
    private route:Router,
     private userservice:UsermiddlewareService
  ) { }

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
