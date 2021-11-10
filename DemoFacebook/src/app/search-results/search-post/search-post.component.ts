import { Component, OnInit } from '@angular/core';
import { CreatePostService } from 'src/app/services/create-post.service';
import { FriendrelationshipService } from 'src/app/services/friendrelationship.service';

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.css']
})
export class SearchPostComponent implements OnInit {

  constructor(
    private friendship:FriendrelationshipService,
    private postMiddle:CreatePostService
  ) { }

  box:any;
  allpost:any;
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
      this.allpost = res;
      console.log(res);
    })
  }

}
