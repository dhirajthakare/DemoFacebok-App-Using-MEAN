import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-messanger-sidebar-left',
  templateUrl: './messanger-sidebar-left.component.html',
  styleUrls: ['./messanger-sidebar-left.component.scss']
})
export class MessangerSidebarLeftComponent implements OnInit {

  
  constructor(
    private userservice:UserService
  ) { }

  data:any;
  token:any;
  ngOnInit(): void {

    this.userservice.currentMessangerUser.subscribe((res:any)=>{
      console.log(res);

      this.token = res.userToken;

      if(this.token){
        this.userservice.getUser(this.token).subscribe(res=>{
          this.data=res;
        })
      }

    })

  }

}
