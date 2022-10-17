import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private BaseUrl: any = environment.ApiURL;  

  constructor( private http :HttpClient) { }


  createPost(formdata:any){
    return this.http.post(this.BaseUrl+'/createpost',formdata)
  }
  updatePost(formdata:any){
    return this.http.post(this.BaseUrl+'/updatepost',formdata)
  }
  getpostData(id:number){
    return this.http.get(this.BaseUrl+'/getpostdata/'+id);
  }


  likeorUnlike(formdata:any){
   return  this.http.post(this.BaseUrl+'/likedislike',formdata);
  }
  getlikeUser(id:number):Observable<any>{
    return this.http.get(this.BaseUrl+'/getpostlke/'+id);
  }

  deletePost(id:number){
    return this.http.get(this.BaseUrl+'/deletepost/'+id);
  }


  createcomment(formdata:any){
    return this.http.post(this.BaseUrl+'/createcomment/',formdata);
  }

  deletcomment(cid:number,pid:number){
   return this.http.get(this.BaseUrl+'/deletecomment/'+cid+'/'+pid);
  }

  searchPost(search:any){
    return this.http.get(this.BaseUrl+'/findpost/'+search);
  }


}
