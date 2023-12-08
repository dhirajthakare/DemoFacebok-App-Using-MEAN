import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateAccountField, LoginForm } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private BaseUrl: any = environment.ApiURL;

  createAcc(formdata: LoginForm) {
    return this.http.post(this.BaseUrl + '/createAccount', formdata);
  }

  getUserProfile() {
    return this.http.get(this.BaseUrl + '/getprofile');
  }

  LoginAcc(formdata: CreateAccountField) {
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

  changePassword(data: LoginForm) {
    return this.http.post(this.BaseUrl + '/changepassword', data);
  }
}
