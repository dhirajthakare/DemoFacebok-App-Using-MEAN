import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, interval } from 'rxjs';
import { MessangerService } from '../services/messanger.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-box-messanger',
  templateUrl: './box-messanger.component.html',
  styleUrls: ['./box-messanger.component.scss']
})
export class BoxMessangerComponent implements OnInit {

  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private messanger:MessangerService,
    private userservice:UserService
  ) { }

  ngOnInit(): void {
    console.log(this.data);

      if(this.data){
        this.oninitgetdata();
      }

  }
  allmessage:any;
  @ViewChild('scrollMe')
  private myScrollContainer!: ElementRef;
  @ViewChild('sendmessage') sendMessageInput : ElementRef | any
  public i:number = 0;
  getAllMessage(){
    this.messanger.getmessage(this.data.user_id,this.data.friend_id).subscribe(res=>{
      console.log(res);
      this.allmessage=res;
      if(this.allmessage){
        if(this.i==1){
          this.scrollToBottom();
        }
      }
    })
  }
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}
  currentUser:any;
  oninitgetdata(){

    this.userservice.getUser(this.data.userToken).subscribe((res: any)=>{
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
  messangerClick(){

    let intervaldata = interval(4000);

    this.continuousgetmessage = intervaldata.subscribe(res=>{
      // var length = Object.keys(this.allmessage).length;
      // console.log(length)
      this.getAllMessage();
      // this.sendMessageInput.nativeElement.focus();
      console.log("box = "+this.i++);
    })

   
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
    console.log("close");
    this.continuousgetmessage.unsubscribe();
  }


}
