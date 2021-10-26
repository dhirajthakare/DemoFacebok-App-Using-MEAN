import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MessangerService } from '../services/messanger.service';

@Component({
  selector: 'app-messanger',
  templateUrl: './messanger.component.html',
  styleUrls: ['./messanger.component.css']
})
export class MessangerComponent implements OnInit {

  constructor(
    private messanger:MessangerService
  ) { }

   userId :any;
   friendId :any;
  profileUrl :any;
  cname :any;




  ngOnInit(): void {
 this.getvalues();

  }
  getvalues(){
    this.userId =  this.messanger.user_id
    this.friendId =  this.messanger.friend_id
    this.profileUrl =  this.messanger.profileUrl
    this.cname =  this.messanger.friendname;
    this.messagedisplay();
    this.messagedisplay();


  }

  //  message Session

@ViewChild('sendmessage') sendMessageInput : ElementRef | any
chatMessage:any;
sendmsg(value:any){
console.log(value)
let formdata = new FormData();

formdata.append('message',value);
formdata.append('sender_id',this.userId.id);
formdata.append('receiver_id',this.friendId.id);

this.messanger.sendmessage(formdata).subscribe(res=>{
  console.log(res);
  this.getAllMessage();
  this.chatMessage = '';
  this.sendMessageInput.nativeElement.focus();
})
  }

  allmessage :any;
  getAllMessage(){
    this.messanger.getmessage(this.userId.id,this.friendId.id).subscribe(res=>{
      console.log(res);
      this.allmessage=res;
      this.sendMessageInput.nativeElement.focus();

    })
  }
  messangerdisplayBox:any
  messagedisplay(){
    this.messanger.messangerdisplayBox.subscribe(res=>{
      this.messangerdisplayBox=res;
    })
  }

  messangerClick(){
    this.messanger.messangerdisplayBox.next(true);

    setTimeout(() => {
      this.sendMessageInput.nativeElement.focus();
    }, 500);

  }

}
