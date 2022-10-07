import { Component, Input, OnInit } from '@angular/core';
import { FriendService } from 'src/app/common/services/friend.service';
import { StorieService } from 'src/app/common/services/storie.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-show-stories',
  templateUrl: './show-stories.component.html',
  styleUrls: ['./show-stories.component.scss']
})
export class ShowStoriesComponent implements OnInit {

  
  constructor(

    private userservice:UserService,
    private storymanage:StorieService,
    private friend:FriendService
  ) { }

  @Input('loginUserId') loginUserId :any;
  data:any;
  ngOnInit(): void {
    console.log(this.loginUserId);
    this.getAllUserId(this.loginUserId);
    this.userservice.currentLoginUser.subscribe( (res: any) =>{
      console.log(res);
      this.data=res;
      // this.getstories();
    });
  }

  
allstory:any;
userstory:any;
userFriensStory:any;

  getstories(){
    this.storymanage.getstory(this.loginUserId,this.friendsId).subscribe((res)=>{
      console.log(res);
      this.allstory=res;
      this.userstory=this.allstory[1].userstories;
      this.userFriensStory = this.allstory[2].userFriendStories;
      this.allstory = this.allstory[0].allStories;
      console.log(this.allstory);
      console.log(this.userstory);
      console.log(this.userFriensStory);


    },(err)=>{
      console.log(err);
    })
  }

  friends:any;
  friendsId:any=[];
  getAllUserId(id:any){

    this.friend.getUseFriends(id).subscribe(res=>{
          this.friends=res;
          console.log(this.friends);
    
          if(this.friends){
            this.friends=this.friends.user_Friends;
            // this.friendsId.push(this.id);
          for(let i=0;i<this.friends.length;i++){
            this.friendsId.push(this.friends[i]._id);
          }
          // this.friend.userLoginFriendsId.next(this.friendsId);
          this.getstories();
          console.log(this.friendsId);
          }
          
  
    
        },err=>{
          console.log(err);
        })
      }

}