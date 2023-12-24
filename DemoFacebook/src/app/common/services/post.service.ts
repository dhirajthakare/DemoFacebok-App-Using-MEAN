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

  createPost(formData:any){
    return this.http.post(this.BaseUrl+'/create-post',formData)
  }

  updatePost(formData:any){
    return this.http.post(this.BaseUrl+'/update-post',formData)
  }

  getPostData(id:number){
    return this.http.get(this.BaseUrl+'/get-post-data/'+id);
  }

  likeOrUnlike(formData:any){
   return  this.http.post(this.BaseUrl+'/toggle-like',formData);
  }
  getLikeUser(id:number):Observable<any>{
    return this.http.get(this.BaseUrl+'/get-post-like/'+id);
  }

  deletePost(id:number){
    return this.http.get(this.BaseUrl+'/delete-post/'+id);
  }


  createComment(formData:any){
    return this.http.post(this.BaseUrl+'/create-comment/',formData);
  }

  deleteComment(cid:number,pid:number){
   return this.http.get(this.BaseUrl+'/delete-comment/'+cid+'/'+pid);
  }

  searchPost(search:any){
    return this.http.post(this.BaseUrl+'/search-post/',{"search":search});
  }

}
