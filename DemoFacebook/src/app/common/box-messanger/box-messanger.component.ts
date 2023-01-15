import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { MessangerService } from '../services/messanger.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-box-messanger',
  templateUrl: './box-messanger.component.html',
  styleUrls: ['./box-messanger.component.scss'],
})
export class BoxMessangerComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messanger: MessangerService,
    private userservice: UserService
  ) {}
  destroye$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.messanger.getRealtimeChat().pipe(takeUntil(this.destroye$)).subscribe((res:any)=>{
      if(res.includes(this.data.loginUser_id) && res.includes(this.data.friend_id)){
        this.getAllMessage();
      }
    });
    if (this.data) {
      this.oninitgetdata();
    }
  }

  TrackByFun(index:number,item:any){
    return item._id;
  }
  
  allmessage: any;
  @ViewChild('scrollMe')
  private myScrollContainer!: ElementRef;

  getAllMessage() {
    this.messanger
      .getmessage(this.data.loginUser_id, this.data.friend_id)
      .subscribe((res) => {
        this.allmessage = res;
        if (this.allmessage) {
          setTimeout(() => {
            this.scrollToBottom();
          }, 500);
        }
      });
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
  friendDetails: any;
  oninitgetdata() {
    this.userservice.getUser(this.data.friendUsertoken).subscribe((res: any) => {
      if (res) {
        this.friendDetails = res;
        if (this.friendDetails) {
          this.getAllMessage();
        }
      }
    });
  }

  //  message Session

  chatMessage: any = '';
  messageEmojiPicker: any;

  sendmsg(value: any) {

    let dataf = {
      message: value,
      sender_id: this.data.loginUser_id,
      receiver_id: this.data.friend_id,
    };

    this.messanger.sendmessage(dataf).subscribe((res) => {
      this.messanger.sendRealTimeMessage([this.data.loginUser_id,this.data.friend_id]);
      this.chatMessage = '';
      this.messageEmojiPicker = false;
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
  
  ngOnDestroy(): void {
    this.destroye$.next();
  }
}
