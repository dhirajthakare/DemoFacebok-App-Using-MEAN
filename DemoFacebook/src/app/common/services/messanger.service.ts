import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessangerService {

  private BaseUrl: any = environment.ApiURL;

  messangerdisplayBox = new BehaviorSubject(false);
  user_id:any;
  friend_id:any;
  profileUrl:any;
  friendname:any;


  constructor(private http:HttpClient) { }

  sendmessage(formdata:any){
    return this.http.post(this.BaseUrl+'/sendmessage',formdata);
  }

  getmessage (uid:any,fid:any){
    return this.http.get(this.BaseUrl+'/getmessage/'+uid+"/"+fid);
  }
}
