import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/common/services/shared-data.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-all-photos',
  templateUrl: './all-photos.component.html',
  styleUrls: ['./all-photos.component.scss']
})
export class AllPhotosComponent implements OnInit {
  
  constructor(
    private userservice:UserService,
    private sharedService:SharedDataService
  ) { }

data:any;
currentUser:any;
allPosts:any;


  ngOnInit(): void {
    this.sharedService.changeTitle('Deskbook | Photos');

    this.userservice.currentLoginUser.subscribe( (res: any) =>{
      console.log(res);
      this.data=res;  
      if(this.data){
        this.oninitgetdata();
      }

    });

  }

  oninitgetdata(){

    this.userservice.currentVisitedUser.subscribe((res: any)=>{
      this.currentUser = res;
      if(this.currentUser){
        this.getpost();
      }
    })
  }

  getpost(){
    this.userservice.getCurrentUserPost(this.currentUser._id,this.data._id).subscribe((res: any)=>{
      
      this.allPosts=res;
      console.log(this.allPosts);
    })


  
  }

}
