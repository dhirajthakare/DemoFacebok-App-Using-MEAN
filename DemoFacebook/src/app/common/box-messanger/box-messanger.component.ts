import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, interval, timeout, Subject, takeUntil } from 'rxjs';
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

  ngOnInit(): void {
    if (this.data) {
      this.oninitgetdata();
    }
  }
  allmessage: any;
  @ViewChild('scrollMe')
  private myScrollContainer!: ElementRef;
  @ViewChild('sendmessage') sendMessageInput: ElementRef | any;
  destroye$: Subject<void> = new Subject<void>();

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
          this.messangerClick();
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
      this.getAllMessage();
      this.chatMessage = '';
      this.sendMessageInput.nativeElement.focus();
      this.messageEmojiPicker = false;
    });
  }

  messangerClick() {
    let intervaldata = interval(4000);

    intervaldata.pipe(takeUntil(this.destroye$)).subscribe((res) => {
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
  
  ngOnDestroy(): void {
    this.destroye$.next();
  }
}
