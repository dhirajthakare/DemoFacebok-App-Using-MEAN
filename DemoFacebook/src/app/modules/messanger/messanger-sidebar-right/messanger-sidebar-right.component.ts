import { Component, OnInit } from '@angular/core';
import { FriendService } from 'src/app/common/services/friend.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-messanger-sidebar-right',
  templateUrl: './messanger-sidebar-right.component.html',
  styleUrls: ['./messanger-sidebar-right.component.scss']
})
export class MessangerSidebarRightComponent implements OnInit {

  
  constructor(
    private userservice:UserService,
     private friendship:FriendService
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
    this.assignRecentChat();
  },err=>{
    console.log(err);
  })
}
getUserSearchFriends(searchfrd:any){

  console.log(searchfrd);
  this.friendship.getUseSerachFriends(this.data._id,searchfrd).subscribe(res=>{
    console.log(res);
    // this.friends=res;
  },err=>{
    console.log(err);
  })

}

assignRecentChat(){
  console.log(this.friends.user_Friends[0]);

  let newdata = {
    friend_id:this.friends.user_Friends[0].friend_id._id,
    user_id:this.data._id,
    userToken:this.friends.user_Friends[0].friend_id.userToken
  }
  this.userservice.currentMessangerUser.next(newdata);

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
