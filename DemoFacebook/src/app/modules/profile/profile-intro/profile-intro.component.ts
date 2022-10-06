import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-profile-intro',
  templateUrl: './profile-intro.component.html',
  styleUrls: ['./profile-intro.component.scss']
})
export class ProfileIntroComponent implements OnInit {

  
  data:any;
  currentUser:any;
  constructor(
    private userservice:UserService
  ) { }

  ngOnInit(): void {
    this.userservice.currentLoginUser.subscribe( (res: any) =>{
      console.log(res);
      this.data=res;
  
    });
   
    this.oninitgetdata();
  
  }

  oninitgetdata(){

    this.userservice.currentVisitedUser.subscribe((res: any)=>{
      this.currentUser = res;
      console.log(this.currentUser);

    })

}

}
