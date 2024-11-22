import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  private socket = io('https://demofacebok-app-using-mean.onrender.com/')

  private BaseUrl: any = environment.ApiURL;

  user_id:any;
  friend_id:any;
  profileUrl:any;
  friendName:any;


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
    return this.http.post(this.BaseUrl+'/send-message',formData);
  }

  getMessage (uid:any,fid:any){
    return this.http.get(this.BaseUrl+'/get-message/'+uid+"/"+fid);
  }
}
