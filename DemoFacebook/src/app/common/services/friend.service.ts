import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponse } from '../interface/comman.interface';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  constructor(private http: HttpClient) {}

  private BaseUrl: any = environment.ApiURL;

  searchBox = new BehaviorSubject<string>('');
  searchBoxVisibility: any = new BehaviorSubject<boolean>(false);
  userLoginFriendsId = new BehaviorSubject<string[]>([]);

  searchUsers(name: string): Observable<any> {
    return this.http.post(this.BaseUrl + '/find-friend/', { name: name });
  }

  sendRequest(uid: any, fid: any) {
    return this.http.get(this.BaseUrl + '/add-friend/' + uid + '/' + fid);
  }

  acceptRequest(uid: any, fid: any) {
    return this.http.get(
      this.BaseUrl + '/accept-friend-request/' + uid + '/' + fid
    );
  }

  rejectRequest(uid: any, fid: any) {
    return this.http.get(
      this.BaseUrl + '/reject-friend-request/' + uid + '/' + fid
    );
  }

  getUserRequest(id: any) {
    return this.http.get(this.BaseUrl + '/get-all-request/' + id);
  }

  async getUseFriends(id: any) {
    console.log(id)
    const response = await lastValueFrom(
      this.http.get<IResponse<User[]>>(this.BaseUrl + '/get-user-friends/' + id)
    );
    return response.data;  
  }



  getUseSerachFriends(id: any, name: string) {
    return this.http.get(
      this.BaseUrl + '/all-user-friends-search/' + id + '/' + name
    );
  }
  getAllFriendsPost(payload: any) {
    return this.http.post(this.BaseUrl + '/all-friends-post', payload);
  }

  unfriend(uid: number, fid: number) {
    return this.http.get(this.BaseUrl + '/unfriend/' + uid + '/' + fid);
  }
}
