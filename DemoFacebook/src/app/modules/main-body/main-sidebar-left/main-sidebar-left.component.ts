import { Component, OnInit } from '@angular/core';
import { FriendService } from 'src/app/common/services/friend.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-main-sidebar-left',
  templateUrl: './main-sidebar-left.component.html',
  styleUrls: ['./main-sidebar-left.component.scss']
})
export class MainSidebarLeftComponent implements OnInit {

  
  constructor(
    private friendship:FriendService,
    private userservice:UserService
  ) { }

  data:any
  searchbox:any;
  userdata:any;
  ngOnInit(): void {
    
    this.userservice.currentLoginUser.subscribe( (res: any) =>{
      console.log(res);
      this.data=res;
    });


  }

}
