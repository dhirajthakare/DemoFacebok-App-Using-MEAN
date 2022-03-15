import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsermiddlewareService {

  constructor(private http:HttpClient) { }

  createuserInfourl="http://localhost:2000/createuserinformation";
  getUserUrl = "http://localhost:2000/getcurrentloginuser/";
  getCurrentUserPostUrl = "http://localhost:2000/getcurrentuserposts/";


  currentVisitedUser:any = new BehaviorSubject<any>('');
  currentLoginUser:any = new BehaviorSubject<any>('');
  currentMessangerUser:any = new BehaviorSubject<any>('');



  createUserInfo(formdata:any){
    return this.http.post(this.createuserInfourl,formdata);
  }
  getUser(token:any){
    return this.http.get(this.getUserUrl+token);
  }
  getCurrentUserPost(cid:any,clickId:any):Observable<any>{
   return this.http.get(this.getCurrentUserPostUrl+cid+'/'+clickId);
  }

}
