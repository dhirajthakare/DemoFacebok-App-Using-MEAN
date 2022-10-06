import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-all-photos',
  templateUrl: './all-photos.component.html',
  styleUrls: ['./all-photos.component.scss']
})
export class AllPhotosComponent implements OnInit {

  
  constructor(
    private userservice:UserService
  ) { }

data:any;
currentUser:any;

  ngOnInit(): void {

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

  allPosts:any;
  getpost(){
    this.userservice.getCurrentUserPost(this.currentUser._id,this.data._id).subscribe((res: any)=>{
      
      this.allPosts=res;
      console.log(this.allPosts);
    })


  
  }

}
