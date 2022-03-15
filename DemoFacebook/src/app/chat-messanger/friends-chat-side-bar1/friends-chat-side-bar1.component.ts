import { Component, OnInit } from '@angular/core';
import { FriendrelationshipService } from 'src/app/services/friendrelationship.service';
import { UsermiddlewareService } from 'src/app/services/usermiddleware.service';

@Component({
  selector: 'app-friends-chat-side-bar1',
  templateUrl: './friends-chat-side-bar1.component.html',
  styleUrls: ['./friends-chat-side-bar1.component.css']
})
export class FriendsChatSideBar1Component implements OnInit {

  constructor(
    private userservice:UsermiddlewareService,
     private friendship:FriendrelationshipService
  ) { }

  data:any;
  friends:any;

  ngOnInit(): void {
    this.userservice.currentLoginUser.subscribe( (res: any) =>{
      console.log(res);
      this.data=res;
      if(this.data){
        this.getUserFriends();
      }
    });
  }

  
// @HostListener("document:click")
// clickedOut() {
//   this.friendship.searchBoxVisibility.next(false);
// }

getUserFriends(){
  this.friendship.getUseFriends(this.data._id).subscribe(res=>{
    console.log(res);
    this.friends=res;
  },err=>{
    console.log(err);
  })
}

Opemessanger(data:any){
  console.log(data);
  let newdata = {
    friend_id:data._id,
    user_id:this.data._id,
    userToken:data.userToken
  }
  this.userservice.currentMessangerUser.next(newdata);
}

}
