import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  private BaseUrl: any = environment.ApiURL;  

  constructor( private http:HttpClient) { }

  createStory(formData:any){
    return this.http.post(this.BaseUrl+'/create-story',formData);
  }

  getStories(id:number,ids:any){
    return this.http.post(this.BaseUrl+'/get-story/'+id,ids);
  }
}
