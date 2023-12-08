import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class TakeCallService {

  constructor() { }
  socket = io("localhost:2000");

  createRoom(ROOM_ID: any, userName: any, userId: any,friendDetail:any,videochatUrl:any) {
    this.socket.emit('join-room', ROOM_ID, userName, userId,friendDetail,videochatUrl);
  }

  getConnectedUser() {
    let observable = new Observable<any>((observer) => {
      this.socket.on('user-connected', (UserId) => {
        observer.next(UserId);
      });
      return () => {
        // this.socket.disconnect();
      };
    });

    return observable;
  }

  someOneCallYou() {
    let observable = new Observable<any>((observer) => {
      this.socket.on('call-friend', (details) => {
        observer.next(details);
      });
      return () => {
        // this.socket.disconnect();
      };
    });

    return observable;
  }

  sendMessage(message: any) {
    this.socket.emit('send-message', message);
  }

  getMessage() {
    let observable = new Observable<any>((observer) => {
      this.socket.on('getMessage', (messageDetails) => {
        observer.next(messageDetails);
      });
      return () => {
        // this.socket.disconnect();
      };
    });

    return observable;
  }

  leaveRoom() {
    this.socket.emit('leave room');
  }
  getLeaveRoomuser() {
    let observable = new Observable<any>((observer) => {
      this.socket.on('leave room user', (res) => {
        observer.next(res);
      });
      return () => {
        // this.socket.disconnect();
      };
    });

    return observable;
  }
}
