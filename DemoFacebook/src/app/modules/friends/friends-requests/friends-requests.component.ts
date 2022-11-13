import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { FriendService } from 'src/app/common/services/friend.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-friends-requests',
  templateUrl: './friends-requests.component.html',
  styleUrls: ['./friends-requests.component.scss']
})
export class FriendsRequestsComponent implements OnInit {

  
  constructor(
    private friend:FriendService,
    private toastr:ToastrService,
    private userservice:UserService
  ) { }

  loginuserDetails:any;
  request:any;
  onDestroy$:Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.getUserLoginDetails();
  }

  getUserLoginDetails(){
    this.userservice.currentLoginUser.pipe(takeUntil(this.onDestroy$)).subscribe( (res: any) =>{
      if(res){
      this.loginuserDetails=res;
      if(this.loginuserDetails){
        this.getUserRequest();
      }
      }
    })
  }

  getUserRequest(){
    this.friend.getUserRequest(this.loginuserDetails._id).subscribe(res=>{
      if(res){
      this.request=res;
      }

    },err=>{
      console.log(err);
    })
  }
  acceptRequest(fid:any){
    this.friend.acceptRequest(this.loginuserDetails._id,fid).subscribe(res=>{
      if(res){
      this.request=res;
      this.getUserRequest();
      this.toastr.success('Request Accepted','Success!');
      }
    },err=>{
      console.log(err);
    })
  }
  rejectRequest(fid:any){
    if(confirm("Are you sure You want to reject Request ?")){
      this.friend.rejectRequest(this.loginuserDetails._id,fid).subscribe(res=>{
       if(res){
        this.request=res;
        this.getUserRequest();
        this.toastr.success('Request Rejected','Success!');
       }
      },err=>{
        console.log(err);
      })
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

}
