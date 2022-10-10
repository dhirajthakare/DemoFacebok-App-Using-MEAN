import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  
  constructor(
    private route:Router,
     private userservice:UserService
  ) { }

  ngOnInit(): void {
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
