import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  private BaseUrl: any = environment.ApiURL;  

  currentVisitedUser:any = new BehaviorSubject<any>('');
  currentLoginUser:any = new BehaviorSubject<any>('');
  currentMessengerUser:any = new BehaviorSubject<any>('');


  createUserInfo(formdata:any){
    return this.http.post(this.BaseUrl+'/createuserinformation',formdata);
  }
  
  getUser(token:any){
    return this.http.get(this.BaseUrl+'/getcurrentloginuser/'+token);
  }

  getCurrentUserPost(cid:any,clickId:any):Observable<any>{
   return this.http.get(this.BaseUrl+'/getcurrentuserposts/'+cid+'/'+clickId);
  }

}
