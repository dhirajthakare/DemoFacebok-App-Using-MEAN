import { Component, OnInit } from '@angular/core';
import { UsermiddlewareService } from 'src/app/services/usermiddleware.service';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.css']
})
export class UserFriendsComponent implements OnInit {

  constructor(
    private userservice:UsermiddlewareService
  ) { }

  data:any;
  currentUser:any
  ngOnInit(): void {
    this.loginuser();
  }

    loginuser(){
      this.userservice.currentLoginUser.subscribe( (res: any) =>{
        console.log(res);
        this.data=res;
        if(this.data){
          this.oninitgetdata();
        }
  
      });
    }
  oninitgetdata(){

    this.userservice.currentVisitedUser.subscribe((res: any)=>{
      this.currentUser = res;
      console.log(this.currentUser);
    })
  }

}
