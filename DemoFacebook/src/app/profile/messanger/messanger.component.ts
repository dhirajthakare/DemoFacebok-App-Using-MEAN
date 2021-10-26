import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProfileHeaderComponent } from '../profile-header/profile-header.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MessangerService } from 'src/app/services/messanger.service';
import { UsermiddlewareService } from 'src/app/services/usermiddleware.service';

@Component({
  selector: 'app-messanger',
  templateUrl: './messanger.component.html',
  styleUrls: ['./messanger.component.css']
})
export class MessangerComponent implements OnInit {

  constructor(
    private matdiaref:MatDialogRef<ProfileHeaderComponent>,
    private activrouter : ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: {friend_id: any,user_id: any},
    private messanger:MessangerService,
    private userservice:UsermiddlewareService
  ) { }

  ngOnInit(): void {

    this.activrouter.params.subscribe(res=>{
      console.log(this.data.friend_id);
      console.log(this.data.user_id);

      // this.getdetails(res.id);
    })

  }
  allmessage:any;
  getAllMessage(){
    this.messanger.getmessage(this.data.user_id,this.data.friend_id).subscribe(res=>{
      console.log(res);
      this.allmessage=res;
      // this.sendMessageInput.nativeElement.focus();

    })
  }
  currentUser:any;
  oninitgetdata(){

    this.userservice.currentVisitedUser.subscribe((res: any)=>{
      this.currentUser = res;
      console.log(this.currentUser)
      if(this.currentUser){
        this.getAllMessage();
      }
    })
   
  }

}
