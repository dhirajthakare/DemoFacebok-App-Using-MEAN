import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { MessangerService } from 'src/app/services/messanger.service';
import { UsermiddlewareService } from 'src/app/services/usermiddleware.service';

@Component({
  selector: 'app-friends-chat-main',
  templateUrl: './friends-chat-main.component.html',
  styleUrls: ['./friends-chat-main.component.css']
})
export class FriendsChatMainComponent implements OnInit {
  constructor(
    private activrouter : ActivatedRoute,
    private messanger:MessangerService,
    private userservice:UsermiddlewareService
  ) { }

  data:any;
  
  ngOnInit(): void {
    
    this.userservice.currentMessangerUser.subscribe((res: any)=>{
      this.data = res;
      console.log(res);

      if(this.data){
        this.oninitgetdata();
      }
    })

  }
  allmessage:any;
  @ViewChild('sendmessage') sendMessageInput : ElementRef | any

  getAllMessage(){
    this.messanger.getmessage(this.data.user_id,this.data.friend_id).subscribe(res=>{
      this.allmessage=res;
      console.log(this.allmessage);

    })
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
  public i:number = 0;
  messangerClick(){

    let intervaldata = interval(4000);

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
