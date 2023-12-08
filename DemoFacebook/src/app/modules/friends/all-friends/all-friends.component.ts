import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FriendService } from 'src/app/common/services/friend.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-all-friends',
  templateUrl: './all-friends.component.html',
  styleUrls: ['./all-friends.component.scss']
})
export class AllFriendsComponent implements OnInit {

  
  constructor( 
    private userService : UserService,
    private friend:FriendService
  ) { }

  data:any;
  onDestroy$:Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.getUserLoginDetails();
  }

  getUserLoginDetails(){
    this.userService.currentLoginUser.pipe(takeUntil(this.onDestroy$)).subscribe( (res: any) =>{
      if(res){
        this.data=res;
        if(this.data){
          this.getAllFriends(this.data._id);
        }
      }
    })
  }
  AllUserFriends:any;
  getAllFriends(id:any){
    this.friend.getUseFriends(id).subscribe(res=>{
      this.AllUserFriends=res;
    })
    
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }


}
