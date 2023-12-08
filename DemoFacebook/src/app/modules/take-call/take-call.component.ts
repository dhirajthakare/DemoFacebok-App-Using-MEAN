import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TakeCallService } from 'src/app/common/services/take-call.service';
declare var Peer: any;

@Component({
  selector: 'app-take-call',
  templateUrl: './take-call.component.html',
  styleUrls: ['./take-call.component.scss'],
})
export class TakeCallComponent implements OnInit {
  constructor(
    private socket: TakeCallService,
    private activeRouter: ActivatedRoute,
    private route: Router
  ) {}

  friendDetails: any;
  LoginUserDetails: any = '';
  peer: any;
  myVideoStream: any;
  myVideo = document.createElement('video');

  anotherid: any;
  mypeerid: any;
  copyURl: any = window.location.href;
  callUser: any;
  private onDestroy$: Subject<void> = new Subject<void>();
  ngOnInit(): void {
    this.activeRouter.queryParams.subscribe((res: any) => {
      if (res) {
        this.friendDetails = JSON.parse(atob(res.frienddetails));
        this.callUser = atob(res.callUser);
        console.log(this.friendDetails,this.callUser);
        this.LoginUserDetails = JSON.parse(atob(res.frienddetails));
        this.myVideo.muted = true;
        this.getLatestConnectedUser();
        this.makePeerConnection();
        this.getMessage();
        this.getleaveroomData();
      }
    });
  }

  ngAfterViewInit(): void {}

  getLatestConnectedUser() {
    this.socket
      .getConnectedUser()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res) => {
        if (res) {
          this.connectToNewUser(res, this.myVideoStream);
        }
      });
  }
  videoOn: any = true;

  makePeerConnection() {
    this.peer = new Peer({
      host: 'localhost',
      port: '2000',
      path: '/peerjs',
      // debug: 3
    });

    this.peer.on('open', (id: any) => {
      console.log('my id is ' + id);
      this.socket.createRoom(
        'myroom',
        this.LoginUserDetails.loginUserName,
        id,
        this.callUser == 'addedCall' ? this.friendDetails : '',
        this.route.url
      );
      // socket.emit("join-room", ROOM_ID, id, user);
    });
    let data = navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream: any) => {
        this.myVideoStream = stream;

        this.addVideoStream(this.myVideo, stream, 'loginUser');

        this.peer.on('call', (call: any) => {
          console.log(call);

          console.log('someone call me ', call.peer);
          call.answer(stream);
          const video = document.createElement('video');

          call.on('stream', (userVideoStream: any) => {
            this.addVideoStream(video, userVideoStream, call.peer);
            this.videoOn = false;
          });
        });
      });
  }

  addVideoStream(myVideo: any, stream: any, loginUser: any = '') {
    myVideo.srcObject = stream;
    if (loginUser == 'loginUser') {
      myVideo.setAttribute('id', 'currentUser');
    }
    if (loginUser && loginUser != 'loginUser') {
      myVideo.setAttribute('id', loginUser);
    }
    myVideo.addEventListener('loadedmetadata', () => {
      myVideo.play();
      document.getElementById('video-grid')?.appendChild(myVideo);
      console.log(document.getElementById('video-grid'));
    });
  }

  connectToNewUser = (userId: any, stream: any) => {
    console.log('I call someone ' + userId);
    let call = this.peer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', (userVideoStream: any) => {
      this.addVideoStream(video, userVideoStream, userId);
      this.videoOn = false;
    });
  };

  myVideoClass = 'fa fa-video-camera';
  myAudioClass = 'fa fa-microphone';
  muteOrUnmuteVideo() {
    let enabled: any = this.myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
      this.myVideoStream.getVideoTracks()[0].enabled = false;
      this.myVideoClass = 'fa fa-video-camera-slash';
    } else {
      this.myVideoStream.getVideoTracks()[0].enabled = true;
      this.myVideoClass = 'fa fa-video-camera';
    }
  }
  muteOrUnmuteAudio() {
    let enabled: any = this.myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
      this.myVideoStream.getAudioTracks()[0].enabled = false;
      this.myAudioClass = 'fa fa-microphone-slash';
    } else {
      this.myVideoStream.getAudioTracks()[0].enabled = true;
      this.myAudioClass = 'fa fa-microphone';
    }
  }

  sendVideoLink() {
    prompt(
      'Copy this link and send it to people you want to meet with',
      window.location.href
    );
    // alert('Copy this link and send it to people you want to meet with \n '+window.location.href)
  }

  textMessage: any;
  sendMessage() {
    if (this.textMessage) {
      this.socket.sendMessage(this.textMessage);
      this.textMessage = '';
    }
  }

  allMessage: any = [];
  getMessage() {
    this.socket
      .getMessage()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res: any) => {
        this.allMessage.push({
          message: res.message,
          userName: res.userName,
        });
      });
  }

  leaveRoom() {
    // this.route.navigate(['chat']);
    this.socket.leaveRoom();
    this.route.navigate(['']);
  }
  getleaveroomData() {
    this.socket
      .getLeaveRoomuser()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res) => {
        console.log(res);
        const element = document.getElementById(res.userId);
        element?.remove();
        this.route.navigate(['']);
      });
  }

  name = 'Angular ';
  myWin: any = {};
  open() {
    this.myWin = window.open(
      'https://google.in',
      'popup',
      'width=300,height=300'
    );
    console.log(this.myWin);
  }
  check() {
    console.log(this.myWin.closed);
    if (this.myWin.closed) {
      window.close;
    }
    var myrhis = this;
    var timer = setInterval(function () {
      if (myrhis.myWin.closed) {
        alert('closed');
        clearInterval(timer);
        window.location.reload(); // Refresh the parent page
      }
    }, 1000);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
