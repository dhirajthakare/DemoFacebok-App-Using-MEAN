import { Component, OnInit } from '@angular/core';
import { UsermiddlewareService } from 'src/app/services/usermiddleware.service';

@Component({
  selector: 'app-profile-intro',
  templateUrl: './profile-intro.component.html',
  styleUrls: ['./profile-intro.component.css']
})
export class ProfileIntroComponent implements OnInit {

  data:any;
  currentUser:any;
  constructor(
    private userservice:UsermiddlewareService
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
