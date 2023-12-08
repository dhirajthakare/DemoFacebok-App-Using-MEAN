import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { MessengerService } from '../services/messenger.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-box-messenger',
  templateUrl: './box-messenger.component.html',
  styleUrls: ['./box-messenger.component.scss'],
})
export class BoxMessengerComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messenger: MessengerService,
    private userService: UserService
  ) {}
  destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.messenger
      .getRealtimeChat()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        if (
          res.includes(this.data.loginUser_id) &&
          res.includes(this.data.friend_id)
        ) {
          this.getAllMessage();
        }
      });
    if (this.data) {
      this.onInitGetData();
    }
  }

  TrackByFun(index: number, item: any) {
    return item._id;
  }

  allMessage: any;
  @ViewChild('scrollMe')
  private myScrollContainer!: ElementRef;

  getAllMessage() {
    this.messenger
      .getmessage(this.data.loginUser_id, this.data.friend_id)
      .subscribe((res) => {
        this.allMessage = res;
        if (this.allMessage) {
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
  onInitGetData() {
    this.userService
      .getUser(this.data.friendUserToken)
      .subscribe((res: any) => {
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
    let formData = {
      message: value,
      sender_id: this.data.loginUser_id,
      receiver_id: this.data.friend_id,
    };

    this.messenger.sendMessage(formData).subscribe((res) => {
      this.messenger.sendRealTimeMessage([
        this.data.loginUser_id,
        this.data.friend_id,
      ]);
      this.chatMessage = '';
      this.messageEmojiPicker = false;
    });
  }

  addMessengerEmoji(event: any) {
    this.chatMessage = this.chatMessage + event.emoji.native;
  }

  MessageToggleEmojiPicker() {
    this.messageEmojiPicker = !this.messageEmojiPicker;
  }

  onFocus() {
    this.messageEmojiPicker = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
