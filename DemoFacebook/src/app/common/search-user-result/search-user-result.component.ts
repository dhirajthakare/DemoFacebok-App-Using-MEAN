import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FriendService } from '../services/friend.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-search-user-result',
  templateUrl: './search-user-result.component.html',
  styleUrls: ['./search-user-result.component.scss']
})
export class SearchUserResultComponent implements OnInit {

  data:any;
  searchbox:any;
  userdata:any;
  displaybtn:boolean = false;
  totalLength:any;

  searchForm:any;
  constructor(
    private userservice:UserService,
    private friendship:FriendService,
    private fb:FormBuilder,

  ) { 

  }
  
  ngAfterViewInit(){
  
  }

  ngOnInit(): void {

    this.userservice.currentLoginUser.subscribe( (res: any) =>{
      console.log(res);
      this.data=res;
    });
  
  
  this.friendship.serchbox.pipe( debounceTime(400) ,distinctUntilChanged()).subscribe(res=>{
    this.searchbox =res;
    this.friendship.serchUsers(this.searchbox).subscribe(data=>{
      console.log(data);
      this.userdata=data;
      this.totalLength = this.userdata.length;
      console.log(this.totalLength);

      this.userdata = data.filter((value:any,index:any)=>{
          return index <= 2 ;
      })

    },err=>{
      this.userdata=null;
      console.log(err);
    })
   
  })

  this.friendship.searchBoxVisibility.subscribe((res: any)=>{
    this.displaybtn=res;
  });



}
ngOnChanges(){

}


}
