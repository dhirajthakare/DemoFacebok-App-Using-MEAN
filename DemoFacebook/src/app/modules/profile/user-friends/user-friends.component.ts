import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.scss']
})
export class UserFriendsComponent implements OnInit {

  constructor(
    private userservice:UserService
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
