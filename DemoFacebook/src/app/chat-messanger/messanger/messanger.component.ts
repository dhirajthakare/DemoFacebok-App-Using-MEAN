import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { ProfileHeaderComponent } from 'src/app/profile/profile-header/profile-header.component';
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
    console.log(this.data);

    this.activrouter.params.subscribe(res=>{
      console.log(this.data.friend_id);
      console.log(this.data.user_id);

      if(this.data){
        this.oninitgetdata();
      }
    })

  }
  allmessage:any;
  @ViewChild('sendmessage') sendMessageInput : ElementRef | any

  getAllMessage(){
    this.messanger.getmessage(this.data.user_id,this.data.friend_id).subscribe(res=>{
      console.log(res);
      this.allmessage=res;
    })
  }
  currentUser:any;
  oninitgetdata(){

    this.userservice.currentVisitedUser.subscribe((res: any)=>{
      this.currentUser = res;
      console.log(this.currentUser)
      if(this.currentUser){
        this.getAllMessage();
        this.messangerClick();
      }
    })
   
  }

  
//  message Session

chatMessage:any='';
messageEmojiPicker:any;

sendmsg(value:any){
console.log(value)

// let formdata = new FormData();
// formdata.append('message',value);
// formdata.append('sender_id',this.data.id);
// formdata.append('receiver_id',this.currentUser.id);

let dataf = {
  "message":value,
  "sender_id":this.data.user_id,
  "receiver_id":this.data.friend_id,
}

this.messanger.sendmessage(dataf).subscribe(res=>{
  console.log(res);
  this.getAllMessage();
  this.chatMessage = '';
  this.sendMessageInput.nativeElement.focus();
  this.messageEmojiPicker=false;

})
  }

 
  messangerdisplayBox:any
  messagedisplay(){

    this.messanger.messangerdisplayBox.subscribe(res=>{
      this.messangerdisplayBox=res;
    })
  }

  continuousgetmessage : Subscription | any;
  public i:number = 0;
  messangerClick(){

    let intervaldata = interval(5000);

    this.continuousgetmessage = intervaldata.subscribe(res=>{
      // var length = Object.keys(this.allmessage).length;
      // console.log(length)
      this.getAllMessage();
      this.sendMessageInput.nativeElement.focus();
      console.log(this.i++);
    })

    setTimeout(() => {
      this.sendMessageInput.nativeElement.focus();
    }, 500);

   
  }

  closemessanger(){
this.continuousgetmessage.unsubscribe();
  }

addMessangerEmoji(event:any){
    console.log(event.emoji.native);

    this.chatMessage = this.chatMessage+event.emoji.native
  }

  MessageToggleEmojiPicker() {
    this.messageEmojiPicker = !this.messageEmojiPicker;
  }
  ngOnDestroy(): void {
    this.continuousgetmessage.unsubscribe();
  }

}
