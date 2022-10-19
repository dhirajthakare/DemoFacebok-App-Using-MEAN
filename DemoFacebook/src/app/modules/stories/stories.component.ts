import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/common/services/shared-data.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {

  

  constructor(
    private route:Router,
    private userservice:UserService,
    private sharedService:SharedDataService
    ) { }
 data:any;
 ngOnInit(): void {
  this.sharedService.changeTitle('Deskbook | Stories');
   this.getcurrentuser();
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
