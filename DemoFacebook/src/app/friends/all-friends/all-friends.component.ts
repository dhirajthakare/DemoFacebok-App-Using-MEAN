import { Component, OnInit } from '@angular/core';
import { FriendrelationshipService } from 'src/app/services/friendrelationship.service';
import { UsermiddlewareService } from 'src/app/services/usermiddleware.service';

@Component({
  selector: 'app-all-friends',
  templateUrl: './all-friends.component.html',
  styleUrls: ['./all-friends.component.css']
})
export class AllFriendsComponent implements OnInit {

  constructor( 
    private userservice : UsermiddlewareService,
    private friend:FriendrelationshipService
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
