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

  createAcc(formData: LoginForm) {
    return this.http.post(this.BaseUrl + '/create-account', formData);
  }

  getUserProfile() {
    return this.http.get(this.BaseUrl + '/get-profile');
  }

  LoginAcc(formData: CreateAccountField) {
    return this.http.post(this.BaseUrl + '/login', formData);
  }

  updateUser(formData: any, id: number) {
    return this.http.post(this.BaseUrl + '/update-account/' + id, formData);
  }

  sendRecoveryMail(data: any) {
    return this.http.post(this.BaseUrl + '/sendmail', data);
  }

  checkOtp(data: any) {
    return this.http.post(this.BaseUrl + '/check-opt', data);
  }

  changePassword(data: LoginForm) {
    return this.http.post(this.BaseUrl + '/change-password', data);
  }
}
