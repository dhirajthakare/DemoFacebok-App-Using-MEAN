import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SharedDataService } from 'src/app/common/services/shared-data.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-all-photos',
  templateUrl: './all-photos.component.html',
  styleUrls: ['./all-photos.component.scss']
})
export class AllPhotosComponent implements OnInit {
  
  constructor(
    private userService:UserService,
    private sharedService:SharedDataService
  ) { }

loginUserDetails:any;
currentVisitedUserDetails:any;
allPosts:any;
destroy$:Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.sharedService.changeTitle('DeskBook | Photos');

    this.userService.currentLoginUser.pipe(takeUntil(this.destroy$)).subscribe( (res: any) =>{
      if(res){
      this.loginUserDetails=res;  
      if(this.loginUserDetails){
        this.oninitgetdata();
      }
      }

    });

  }

  oninitgetdata(){

    this.userService.currentVisitedUser.pipe(takeUntil(this.destroy$)).subscribe((res: any)=>{
      if(res){
        this.currentVisitedUserDetails = res;
      if(this.currentVisitedUserDetails){
        this.getpost();
      }
      }
    })
  }

  getpost(){
    this.userService.getCurrentUserPost(this.currentVisitedUserDetails._id,this.loginUserDetails._id).subscribe((res: any)=>{ 
      if(res){
      this.allPosts=res;
      }
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

}
