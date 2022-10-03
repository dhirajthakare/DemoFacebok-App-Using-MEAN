import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
  ) { }

  creatAccUrl = "http://localhost:2000/createAccount";
  loginAccUrl="http://localhost:2000/login";
  updateAccUrl = "http://localhost:2000/updateAccount/";
  sendMailUrl="http://localhost:2000/sendmail/";
  checkOtpUrl = "http://localhost:2000/checkopt/";
  changePasswordUrl = "http://localhost:2000/changepassword/";


  createAcc(formdata:any){
    return this.http.post(this.creatAccUrl,formdata);
   }

   LoginAcc(formdata:any){
     return this.http.post(this.loginAccUrl,formdata);
    }

    updateUser(formdata:any,id:number){
       return this.http.post(this.updateAccUrl+id,formdata);
    }

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
