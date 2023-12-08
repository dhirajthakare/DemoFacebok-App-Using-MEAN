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


  createUserInfo(formData:any){
    return this.http.post(this.BaseUrl+'/createuserinformation',formData);
  }
  
  getUser(token:any){
    return this.http.get(this.BaseUrl+'/getcurrentloginUser/'+token);
  }

  getCurrentUserPost(cid:any,clickId:any):Observable<any>{
   return this.http.get(this.BaseUrl+'/getCurrentUserposts/'+cid+'/'+clickId);
  }

}
