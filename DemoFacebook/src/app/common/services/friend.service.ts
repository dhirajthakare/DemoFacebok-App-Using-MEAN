import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  searchUrl="http://localhost:2000/findfriends/";
  sendRequestUrl="http://localhost:2000/addfriend/";
  acceptRequestUrl="http://localhost:2000/acceptfriendrequest/";
  rejectRequestUrl="http://localhost:2000/rejectfriendrequest/";

  getUserRequestUrl="http://localhost:2000/getallrequest/";
  getUserFriendsUrl="http://localhost:2000/getuserfriends/";
  getUseSerachFriendsUrl="http://localhost:2000/alluserfriendssearch/";
  getAllFriendsPostUrl="http://localhost:2000/allfriendspost/";
  removeFriendUrl ="http://localhost:2000/unfriend/";



  serchbox = new  BehaviorSubject('');
  searchBoxVisibility:any = new BehaviorSubject<any>(false);
  userLoginFriendsId= new BehaviorSubject<any>('');
 
  constructor(
    private http:HttpClient
  ) { }

  
  serchUsers(name:string):Observable<any>{
   return this.http.get(this.searchUrl+name);
  }

  sendRequest(uid:any,fid:any){
   return  this.http.get(this.sendRequestUrl+uid+'/'+fid);
  }

  acceptRequest(uid:any,fid:any){
    return  this.http.get(this.acceptRequestUrl+uid+'/'+fid);
   }

   rejectRequest(uid:any,fid:any){
    return  this.http.get(this.rejectRequestUrl+uid+'/'+fid);
   }

   getUserRequest(id:any){
    return this.http.get(this.getUserRequestUrl+id);
   }
   getUseFriends(id:any){
    return this.http.get(this.getUserFriendsUrl+id);
   }
   getUseSerachFriends(id:any,name:string){
    return this.http.get(this.getUseSerachFriendsUrl+id+'/'+name);
   }
   getAllFriendsPost(ids:any){
    return this.http.post(this.getAllFriendsPostUrl,ids);
   }

   unfriend(uid:number , fid:number){
     return this.http.get(this.removeFriendUrl+uid+'/'+fid);
   }
}
