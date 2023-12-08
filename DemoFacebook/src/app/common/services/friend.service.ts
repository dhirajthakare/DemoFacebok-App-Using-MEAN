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
  
  serchUsers(name:string):Observable<any>{
   return this.http.post(this.BaseUrl+'/findfriends/',{"name":name});
  }

  sendRequest(uid:any,fid:any){
   return  this.http.get(this.BaseUrl+'/addfriend/'+uid+'/'+fid);
  }

  acceptRequest(uid:any,fid:any){
    return  this.http.get(this.BaseUrl+'/acceptfriendrequest/'+uid+'/'+fid);
   }

   rejectRequest(uid:any,fid:any){
    return  this.http.get(this.BaseUrl+'/rejectfriendrequest/'+uid+'/'+fid);
   }

   getUserRequest(id:any){
    return this.http.get(this.BaseUrl+'/getallrequest/'+id);
   }

   getUseFriends(id:any){
    return this.http.get(this.BaseUrl+'/getuserfriends/'+id);
   }

   getUseSerachFriends(id:any,name:string){
    return this.http.get(this.BaseUrl+'/alluserfriendssearch/'+id+'/'+name);
   }
   getAllFriendsPost(ids:any){
    return this.http.post(this.BaseUrl+'/allfriendspost',ids);
   }
   
   unfriend(uid:number , fid:number){
     return this.http.get(this.BaseUrl+'/unfriend/'+uid+'/'+fid);
   }
}
