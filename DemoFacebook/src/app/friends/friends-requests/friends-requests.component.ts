import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FriendrelationshipService } from 'src/app/services/friendrelationship.service';
import { UsermiddlewareService } from 'src/app/services/usermiddleware.service';

@Component({
  selector: 'app-friends-requests',
  templateUrl: './friends-requests.component.html',
  styleUrls: ['./friends-requests.component.css']
})
export class FriendsRequestsComponent implements OnInit {

  constructor(
    private friend:FriendrelationshipService,
    private toastr:ToastrService,
    private userservice:UsermiddlewareService
  ) { }

  myjson:any = [
    {name:'dhiraj' , id:'2gdtwegdbcbxc555d'},
    {name:'mayur' , id:'2gdtwegdb23vc2cbxc'},
    {name:'sonu' , id:'2gdtwegdbcbsvw33xc'}
  ]

  data:any;
  request:any;
  ngOnInit(): void {
    console.log(this.CheckUserLike("dhiraj"));

    this.userservice.currentLoginUser.subscribe( (res: any) =>{
      console.log(res);
      this.data=res;
      if(this.data){
        this.getUserRequest();
      }

    })

  }

  getUserRequest(){
    this.friend.getUserRequest(this.data._id).subscribe(res=>{
      this.request=res;
      console.log(this.request);

    },err=>{
      console.log(err);
    })
  }
  acceptRequest(fid:any){
    this.friend.acceptRequest(this.data._id,fid).subscribe(res=>{
      console.log(res);
      this.request=res;
      this.getUserRequest();
      this.toastr.success('Request Accepted','Success!');
    },err=>{
      console.log(err);
    })
  }
  rejectRequest(fid:any){
    this.friend.rejectRequest(this.data._id,fid).subscribe(res=>{
      console.log(res);
      this.request=res;
      this.getUserRequest();
      this.toastr.success('Request Rejected','Success!');
    },err=>{
      console.log(err);
    })
  }

  hasMatch:any;
  CheckUserLike(ids:any){

    this.hasMatch =false;
  for (let index = 0; index < this.myjson.length; ++index) {

    let json = this.myjson[index];
    if(json.name == ids){
      this.hasMatch = true;
      break;
   }
  }

 return this.hasMatch;

  }

}
