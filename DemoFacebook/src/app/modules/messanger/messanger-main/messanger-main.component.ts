import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval, Subject, Subscription, takeUntil } from 'rxjs';
import { MessangerService } from 'src/app/common/services/messanger.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-messanger-main',
  templateUrl: './messanger-main.component.html',
  styleUrls: ['./messanger-main.component.scss'],
})
export class MessangerMainComponent implements OnInit {
  constructor(
    private messanger: MessangerService,
    private userservice: UserService
  ) {}

  data: any;
  allmessage: any;
  @ViewChild('sendmessage') sendMessageInput: ElementRef | any;
  ngOnDestroy$:Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.getcurrentMessagererUser(); 
  }


  getcurrentMessagererUser(){
    this.userservice.currentMessangerUser.pipe(takeUntil(this.ngOnDestroy$)).subscribe((res: any) => {
      if (res) {
        this.data = res;
        if (this.data) {
          console.log(this.data);
          this.oninitgetdata();
        }
      }
    });
  }

  friendDetails: any;
  oninitgetdata() {
    this.userservice.getUser(this.data.friend_userToken).subscribe((res: any) => {
      if(res){
      this.friendDetails = res;
      if (this.friendDetails) {
        this.getAllMessage();
      }
      }
    });
  }


  getAllMessage() {
    this.messanger
      .getmessage(this.data.loginUser_id, this.data.friend_id)
      .subscribe((res) => {
        if(res){
        this.allmessage = res;
        console.log(this.allmessage);
        setTimeout(() => {
          this.scrollToBottom();
        }, 100);
        }
      });
  }
  

  //  message Session

  chatMessage: any = '';
  messageEmojiPicker: any;

  sendmsg(value: any) {

    let formData = {
      message: value,
      sender_id: this.data.loginUser_id,
      receiver_id: this.data.friend_id,
    };

    this.messanger.sendmessage(formData).subscribe((res) => {
      if(res){
      console.log(res);
      this.getAllMessage();
      this.chatMessage = '';
      this.messageEmojiPicker = false;
      }
    });
  }


  continuousgetmessage: Subscription | any;
  messangerClick() {
    let intervaldata = interval(4000);

    this.continuousgetmessage = intervaldata.subscribe((res) => {
      this.getAllMessage();
    });
  }

  addMessangerEmoji(event: any) {
    this.chatMessage = this.chatMessage + event.emoji.native;
  }

  MessageToggleEmojiPicker() {
    this.messageEmojiPicker = !this.messageEmojiPicker;
  }
  
  onFocus() {
    this.messageEmojiPicker = false;
  }

  @ViewChild('scrollMe')
  private myScrollContainer!: ElementRef;
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }
}
