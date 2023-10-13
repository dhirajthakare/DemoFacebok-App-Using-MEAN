import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorieService {

  private BaseUrl: any = environment.ApiURL;  

  constructor( private http:HttpClient) { }

  createstory(formdata:any){
    return this.http.post(this.BaseUrl+'/createstory',formdata);
  }

  getstory(id:number,ids:any){
    return this.http.post(this.BaseUrl+'/getstory/'+id,ids);
  }
}
