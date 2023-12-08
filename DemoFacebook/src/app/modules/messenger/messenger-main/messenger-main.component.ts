import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, pipe, Subject, Subscription, takeUntil } from 'rxjs';
import { MessengerService } from 'src/app/common/services/messenger.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-messenger-main',
  templateUrl: './messenger-main.component.html',
  styleUrls: ['./messenger-main.component.scss'],
})
export class MessengerMainComponent implements OnInit {
  constructor(
    private messenger: MessengerService,
    private userService: UserService,
    private route: Router,
    private activeRouter: ActivatedRoute
  ) {}

  data: any;
  allMessage: any;
  ngOnDestroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.messenger
      .getRealtimeChat()
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe((res: any) => {
        if (
          res.includes(this.data.loginUser_id) &&
          res.includes(this.data.friend_id)
        ) {
          this.getAllMessage();
        }
      });
    this.getcurrentMessagererUser();
    this.getCurrentLoginUser();
  }

  TrackByFun(index: number, item: any) {
    return item._id;
  }

  currentloginUserDetails:any;
  getCurrentLoginUser(){
    this.userService.currentLoginUser.subscribe((res:any)=>{
      this.currentloginUserDetails = res;
    })
  }

  getcurrentMessagererUser() {
    this.userService.currentMessengerUser
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe((res: any) => {
        if (res) {
          this.data = res;
          if (this.data) {
            this.onInitGetData();
          }
        }
      });
  }

  friendDetails: any;
  onInitGetData() {
    this.userService
      .getUser(this.data.friend_userToken)
      .subscribe((res: any) => {
        if (res) {
          this.friendDetails = res;
          if (this.friendDetails) {
            this.getAllMessage();
          }
        }
      });
  }

  getAllMessage() {
    this.messenger
      .getmessage(this.data.loginUser_id, this.data.friend_id)
      .subscribe((res) => {
        if (res) {
          this.allMessage = res;
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

    this.messenger.sendMessage(formData).subscribe((res) => {
      if (res) {
        this.messenger.sendRealTimeMessage([
          this.data.loginUser_id,
          this.data.friend_id,
        ]);
        this.chatMessage = '';
        this.messageEmojiPicker = false;
      }
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
  callFriend(friend: any) {
    console.log(friend,this.currentloginUserDetails);
    let frienddetails = {
      friendName:friend.name,
      callFriendName:this.currentloginUserDetails.name,
      friendId:friend._id,
      friendprofileURL:friend.profileUrl
    }

    let loginUserDetail = {
      loginUserName:this.currentloginUserDetails.name,
      loginUserId:this.currentloginUserDetails._id,
      loginUserProfileURL:this.currentloginUserDetails.profileUrl,
    }
    window.open(
      `/takecall/?frienddetails=${btoa(JSON.stringify(frienddetails))}&&&loginUserDetail=${btoa(JSON.stringify(loginUserDetail))}&&callUser=${btoa('addedCall')}`,
      'popup',
      'width=1000,height=1000'
    );
  }
}
