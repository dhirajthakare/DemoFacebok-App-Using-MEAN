import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FriendrelationshipService } from '../services/friendrelationship.service';
import { UsermiddlewareService } from '../services/usermiddleware.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  constructor(
  private router:ActivatedRoute,
  private route:Router,
  private friendship : FriendrelationshipService,
  private userservice:UsermiddlewareService

  ) { }
  searchbox:any;
  ngOnInit(): void {

    if(localStorage.getItem('loggedin')!="true"){
      localStorage.setItem('error',"You need To Login")
      this.route.navigate(['']);
    }
    this.getcurrentuser();

    this.router.queryParams.subscribe(res=>{
      this.searchbox = res.q;
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
