import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateloginserviceService {

  constructor( private http : HttpClient) { }

    creatAccUrl = "http://localhost:2000/createAccount";
    loginAccUrl="http://localhost:2000/login";
    
    updateAccUrl = "http://localhost:2000/updateAccount/";
    createAcc(formdata:any){
     return this.http.post(this.creatAccUrl,formdata);
    }

    LoginAcc(formdata:any){
      return this.http.post(this.loginAccUrl,formdata);
     }

     updateUser(formdata:any,id:number){
        return this.http.post(this.updateAccUrl+id,formdata);
     }

    
}
