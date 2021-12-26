import { Component, Input, OnInit } from '@angular/core';
import { FriendrelationshipService } from 'src/app/services/friendrelationship.service';

import { debounce , debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { UsermiddlewareService } from 'src/app/services/usermiddleware.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private friendship:FriendrelationshipService,
    private userservice:UsermiddlewareService
  ) { }

  data:any
  searchbox:any;
  userdata:any;
  ngOnInit(): void {
    
    this.userservice.currentLoginUser.subscribe( (res: any) =>{
      console.log(res);
      this.data=res;
    });

    // this.friendship.serchbox.pipe( debounceTime(50),distinctUntilChanged()).subscribe(res=>{
    //   this.searchbox =res;
    //  if(this.searchbox){
    //   this.friendship.serchUsers(this.searchbox).subscribe(data=>{  
    //     console.log(data);
    //     this.userdata=data;
    //   },err=>{
    //     console.log(err);
    //   })
    //  }
    // })


  }
}
