import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/common/services/shared-data.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  
  constructor(
    private sharedata:SharedDataService,
     private userservice:UserService
  ) { }

  ngOnInit(): void {
    this.getcurrentuser();
    this.sharedata.changeTitle('Deskbook | Friends');
  }

  token:any;
  getcurrentuser(){
    this.token =  localStorage.getItem('accountToken');
    this.userservice.getUser(this.token).subscribe(res=>{
      console.log(res);
      localStorage.setItem('accountHolder',JSON.stringify(res));
      this.userservice.currentLoginUser.next(res);
  });

 
}


}
