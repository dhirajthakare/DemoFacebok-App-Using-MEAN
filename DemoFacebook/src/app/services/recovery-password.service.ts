import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecoveryPasswordService {

  constructor(
    private http:HttpClient
  ) { }

  sendMailUrl="http://localhost:2000/sendmail/";
  checkOtpUrl = "http://localhost:2000/checkopt/";
  changePasswordUrl = "http://localhost:2000/changepassword/";


  sendRecoveryMail(data:any){
    return this.http.post(this.sendMailUrl,data);
  }

  checkOtp(data:any){
    return this.http.post(this.checkOtpUrl , data);
  }

  changePassword(data:any){
    return this.http.post(this.changePasswordUrl , data);

  }



}
