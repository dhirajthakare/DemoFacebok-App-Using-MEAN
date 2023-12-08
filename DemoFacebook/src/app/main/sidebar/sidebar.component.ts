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
    private userService:UsermiddlewareService
  ) { }

  data:any
  searchBox:any;
  userData:any;
  ngOnInit(): void {
    
    this.userService.currentLoginUser.subscribe( (res: any) =>{
      console.log(res);
      this.data=res;
    });

    // this.friendship.searchBox.pipe( debounceTime(50),distinctUntilChanged()).subscribe(res=>{
    //   this.searchBox =res;
    //  if(this.searchBox){
    //   this.friendship.serchUsers(this.searchBox).subscribe(data=>{  
    //     console.log(data);
    //     this.userData=data;
    //   },err=>{
    //     console.log(err);
    //   })
    //  }
    // })


  }
}
