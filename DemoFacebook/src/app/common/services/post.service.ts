import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor( private http :HttpClient) { }
  
  private BaseUrl: any = environment.ApiURL;  

  createPost(formdata:any){
    return this.http.post(this.BaseUrl+'/createpost',formdata)
  }

  updatePost(formdata:any){
    return this.http.post(this.BaseUrl+'/updatepost',formdata)
  }

  getpostData(id:number){
    return this.http.get(this.BaseUrl+'/getpostdata/'+id);
  }

  likeOrUnlike(formdata:any){
   return  this.http.post(this.BaseUrl+'/likedislike',formdata);
  }
  getlikeUser(id:number):Observable<any>{
    return this.http.get(this.BaseUrl+'/getpostlke/'+id);
  }

  deletePost(id:number){
    return this.http.get(this.BaseUrl+'/deletepost/'+id);
  }


  createComment(formdata:any){
    return this.http.post(this.BaseUrl+'/createcomment/',formdata);
  }

  deleteComment(cid:number,pid:number){
   return this.http.get(this.BaseUrl+'/deletecomment/'+cid+'/'+pid);
  }

  searchPost(search:any){
    return this.http.post(this.BaseUrl+'/findpost/',{"search":search});
  }

}
