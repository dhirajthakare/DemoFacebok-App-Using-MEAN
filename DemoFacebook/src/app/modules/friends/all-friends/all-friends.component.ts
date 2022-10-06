import { Component, OnInit } from '@angular/core';
import { FriendService } from 'src/app/common/services/friend.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-all-friends',
  templateUrl: './all-friends.component.html',
  styleUrls: ['./all-friends.component.scss']
})
export class AllFriendsComponent implements OnInit {

  
  constructor( 
    private userservice : UserService,
    private friend:FriendService
  ) { }

  data:any;
  ngOnInit(): void {
    this.userservice.currentLoginUser.subscribe( (res: any) =>{
      console.log(res);
      this.data=res;
      if(this.data){
        this.getAllFriends(this.data._id);

      }
    })
  }
  AllUserFriends:any;
  getAllFriends(id:any){
    this.friend.getUseFriends(id).subscribe(res=>{
      this.AllUserFriends=res;
      console.log(this.data);
    })
    
  }



}
