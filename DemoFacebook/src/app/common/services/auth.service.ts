import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private BaseUrl: any = environment.ApiURL;

  createAcc(formdata: any) {
    return this.http.post(this.BaseUrl + '/createAccount', formdata);
  }

  LoginAcc(formdata: any) {
    return this.http.post(this.BaseUrl + '/login', formdata);
  }

  updateUser(formdata: any, id: number) {
    return this.http.post(this.BaseUrl + '/updateAccount/' + id, formdata);
  }

  sendRecoveryMail(data: any) {
    return this.http.post(this.BaseUrl + '/sendmail', data);
  }

  checkOtp(data: any) {
    return this.http.post(this.BaseUrl + '/checkopt', data);
  }

  changePassword(data: any) {
    return this.http.post(this.BaseUrl + '/changepassword', data);
  }
}
