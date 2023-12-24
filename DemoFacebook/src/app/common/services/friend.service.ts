import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
 
  constructor(
    private http:HttpClient
  ) { }

  private BaseUrl: any = environment.ApiURL;

  searchBox = new  BehaviorSubject('');
  searchBoxVisibility:any = new BehaviorSubject<any>(false);
  userLoginFriendsId= new BehaviorSubject<any>('');
  
  searchUsers(name:string):Observable<any>{
   return this.http.post(this.BaseUrl+'/find-friend/',{"name":name});
  }

  sendRequest(uid:any,fid:any){
   return  this.http.get(this.BaseUrl+'/add-friend/'+uid+'/'+fid);
  }

  acceptRequest(uid:any,fid:any){
    return  this.http.get(this.BaseUrl+'/accept-friend-request/'+uid+'/'+fid);
   }

   rejectRequest(uid:any,fid:any){
    return  this.http.get(this.BaseUrl+'/reject-friend-request/'+uid+'/'+fid);
   }

   getUserRequest(id:any){
    return this.http.get(this.BaseUrl+'/get-all-request/'+id);
   }

   getUseFriends(id:any){
    return this.http.get(this.BaseUrl+'/get-user-friends/'+id);
   }

   getUseSerachFriends(id:any,name:string){
    return this.http.get(this.BaseUrl+'/all-user-friends-search/'+id+'/'+name);
   }
   getAllFriendsPost(ids:any){
    return this.http.post(this.BaseUrl+'/all-friends-post',ids);
   }
   
   unfriend(uid:number , fid:number){
     return this.http.get(this.BaseUrl+'/unfriend/'+uid+'/'+fid);
   }
}
