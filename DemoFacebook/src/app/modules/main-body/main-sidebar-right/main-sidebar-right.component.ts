import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoxMessangerComponent } from 'src/app/common/box-messanger/box-messanger.component';
import { FriendService } from 'src/app/common/services/friend.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-main-sidebar-right',
  templateUrl: './main-sidebar-right.component.html',
  styleUrls: ['./main-sidebar-right.component.scss']
})
export class MainSidebarRightComponent implements OnInit {

  
  constructor(
    private userservice:UserService,
     private friendship:FriendService,
     private matDia:MatDialog
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

getUserFriends(){
  this.friendship.getUseFriends(this.data._id).subscribe(res=>{
    console.log(res);
    this.friends=res;
  },err=>{
    console.log(err);
  })
}

OpenMessangerDia(item:any){
  const matDiaref = this.matDia.open(BoxMessangerComponent,{
    width:'500px',
    height:'500px',
    data:{
      user_id:this.data._id,
      friend_id:item._id,
      userToken:item.userToken,


    }
  })
}

}
