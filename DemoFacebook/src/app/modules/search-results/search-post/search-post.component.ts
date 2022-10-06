import { Component, OnInit } from '@angular/core';
import { FriendService } from 'src/app/common/services/friend.service';
import { PostService } from 'src/app/common/services/post.service';

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.scss']
})
export class SearchPostComponent implements OnInit {

  
  constructor(
    private friendship:FriendService,
    private postMiddle:PostService
  ) { }

  box:any;
  allpost:any;
  Loader:boolean = true
  style=`height: 240px; background-image: url('http://localhost:2000/assets/images/userdefault.png');background-size: cover; background-position: center;`;
  
  ngOnInit(): void {

    this.friendship.serchbox.subscribe(res=>{
      console.log(res);
      this.box = res;
      this.getSearchPost(this.box);
    })
  }

  getSearchPost(search:any){
    this.postMiddle.searchPost(search).subscribe(res=>{
      this.Loader = false;
      this.allpost = res;
      console.log(res);
    })
  }


}
