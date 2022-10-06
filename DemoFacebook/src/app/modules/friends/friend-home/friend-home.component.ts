import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-friend-home',
  templateUrl: './friend-home.component.html',
  styleUrls: ['./friend-home.component.scss']
})
export class FriendHomeComponent implements OnInit {

 
  constructor(
    private userservice : UserService,
  ) { }

    data:any;
  ngOnInit(): void {
    this.userservice.currentLoginUser.subscribe( (res: any) =>{
      console.log(res);
      this.data=res;
      if(this.data){

      }
    })
  }

}
