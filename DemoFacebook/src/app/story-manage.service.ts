import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoryManageService {

  constructor( private http:HttpClient) { }
  baseurl:any="http://localhost:2000/createstory";
  getstoryUrl:any="http://localhost:2000/getstory/";



  createstory(formdata:any){
    return this.http.post(this.baseurl,formdata);
  }

  getstory(id:number,ids:any){
    return this.http.post(this.getstoryUrl+id,ids);
  }
}
