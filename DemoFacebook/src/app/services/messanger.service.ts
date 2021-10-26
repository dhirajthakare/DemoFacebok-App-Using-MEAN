import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessangerService {

  sendmsgUrl = "http://localhost:2000/sendmessage";
  getmsgUrl = "http://localhost:2000/getmessage/";

  messangerdisplayBox = new BehaviorSubject(false);
  user_id:any;
  friend_id:any;
  profileUrl:any;
  friendname:any;


  constructor(private http:HttpClient) { }

  sendmessage(formdata:any){
    return this.http.post(this.sendmsgUrl,formdata);
  }

  getmessage (uid:any,fid:any){
    return this.http.get(this.getmsgUrl+uid+"/"+fid);
  }

}
