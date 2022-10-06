import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  createPostUrl = 'http://localhost:2000/createpost';
  getpostUrl = 'http://localhost:2000/getpostdata/';
  deletePostUrl = 'http://localhost:2000/deletepost/';
  UpdatePostUrl = 'http://localhost:2000/updatepost/';
  searchPostUrl = 'http://localhost:2000/findpost/';

  likeDislikeUrl = 'http://localhost:2000/likedislike';
  getlikeuserUrl = 'http://localhost:8000/api/user/getpostlke/';

  commentUrl = 'http://localhost:2000/createcomment';
  deleteCommentUrl = 'http://localhost:2000/deletecomment/';
  

  constructor( private http :HttpClient) { }


  createPost(formdata:any){
    return this.http.post(this.createPostUrl,formdata)
  }
  updatePost(formdata:any){
    return this.http.post(this.UpdatePostUrl,formdata)
  }
  getpostData(id:number){
    return this.http.get(this.getpostUrl+id);
  }


  likeorUnlike(formdata:any){
   return  this.http.post(this.likeDislikeUrl,formdata);
  }
  getlikeUser(id:number):Observable<any>{
    return this.http.get(this.getlikeuserUrl+id);
  }

  deletePost(id:number){
    return this.http.get(this.deletePostUrl+id);
  }


  createcomment(formdata:any){
    return this.http.post(this.commentUrl,formdata);
  }

  deletcomment(cid:number,pid:number){
   return this.http.get(this.deleteCommentUrl+cid+'/'+pid);
  }

  searchPost(search:any){
    return this.http.get(this.searchPostUrl+search);
  }


}
