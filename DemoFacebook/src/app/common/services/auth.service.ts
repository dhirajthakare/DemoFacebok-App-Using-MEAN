import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  CreateAccountField,
  LoginForm,
  User,
} from '../interface/user.interface';
import { lastValueFrom, retry } from 'rxjs';
import { IResponse } from '../interface/comman.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private BaseUrl: any = environment.ApiURL;

  createAcc(formData: LoginForm) {
    return this.http.post(this.BaseUrl + '/create-account', formData);
  }

  async getUserProfile(): Promise<User> {
    const response = await lastValueFrom(
      this.http.get<IResponse<User>>(this.BaseUrl + '/get-profile')
    );
    return response.data as User;
  }

  LoginAcc(formData: CreateAccountField) {
    return this.http.post(this.BaseUrl + '/login', formData);
  }

  updateUser(formData: any, id: number) {
    return this.http.post(this.BaseUrl + '/update-account/' + id, formData);
  }

  async sendRecoveryMail(data: any) {
    return await lastValueFrom(
      this.http.post(this.BaseUrl + '/sendmail', data)
    );
  }

  checkOtp(data: any) {
    return this.http.post(this.BaseUrl + '/check-opt', data);
  }

  changePassword(data: LoginForm) {
    return this.http.post(this.BaseUrl + '/change-password', data);
  }
}
