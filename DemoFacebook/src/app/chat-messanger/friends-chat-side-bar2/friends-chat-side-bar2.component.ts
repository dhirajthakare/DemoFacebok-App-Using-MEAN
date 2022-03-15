import { Component, OnInit } from '@angular/core';
import { UsermiddlewareService } from 'src/app/services/usermiddleware.service';

@Component({
  selector: 'app-friends-chat-side-bar2',
  templateUrl: './friends-chat-side-bar2.component.html',
  styleUrls: ['./friends-chat-side-bar2.component.css']
})
export class FriendsChatSideBar2Component implements OnInit {

  constructor(
    private userservice:UsermiddlewareService
  ) { }

  data:any;
  token:any;
  ngOnInit(): void {

    this.userservice.currentMessangerUser.subscribe((res:any)=>{

      this.token = res.userToken;

      if(this.token){
        this.userservice.getUser(this.token).subscribe(res=>{
          this.data=res;
        })
      }

    })

  }

}
