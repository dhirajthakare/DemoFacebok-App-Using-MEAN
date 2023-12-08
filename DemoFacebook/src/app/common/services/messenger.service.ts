import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  private socket = io('http://localhost:2000/')

  private BaseUrl: any = environment.ApiURL;

  user_id:any;
  friend_id:any;
  profileUrl:any;
  friendname:any;


  constructor(private http:HttpClient) { }

  getRealtimeChat(){
    let observable = new Observable<any>(
      (observer) => {
        this.socket.on('get chat message', (data) => {
          observer.next(data);
        });
        return () => {
          // this.socket.disconnect();
        };
      }
    );

    return observable;
  }

  sendRealTimeMessage(item:any){
    this.socket.emit("send message",item)
  }

  sendMessage(formData:any){
    return this.http.post(this.BaseUrl+'/sendMessage',formData);
  }

  getmessage (uid:any,fid:any){
    return this.http.get(this.BaseUrl+'/getmessage/'+uid+"/"+fid);
  }
}
