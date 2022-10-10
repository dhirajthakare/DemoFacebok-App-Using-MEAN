import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FriendService } from 'src/app/common/services/friend.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  
  constructor(
    private router:ActivatedRoute,
    private route:Router,
    private friendship : FriendService,
    private userservice:UserService
  
    ) { }
    searchbox:any;
    ngOnInit(): void {
      this.getcurrentuser();
  
      this.router.queryParams.subscribe(res=>{
        this.searchbox = res;
        this.searchbox = this.searchbox.q;
        this.friendship.serchbox.next(this.searchbox);
  
      })
    }
  
    token:any;
    getcurrentuser(){
      this.token =  localStorage.getItem('accountToken');
      this.userservice.getUser(this.token).subscribe(res=>{
        console.log(res);
        localStorage.setItem('accountHolder',JSON.stringify(res));
        this.userservice.currentLoginUser.next(res);
    });
  
   
  }

}
