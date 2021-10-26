import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FriendrelationshipService } from 'src/app/services/friendrelationship.service';
import { UsermiddlewareService } from 'src/app/services/usermiddleware.service';

@Component({
  selector: 'app-sidebar2',
  templateUrl: './sidebar2.component.html',
  styleUrls: ['./sidebar2.component.css']
})
export class Sidebar2Component implements OnInit {

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

}
