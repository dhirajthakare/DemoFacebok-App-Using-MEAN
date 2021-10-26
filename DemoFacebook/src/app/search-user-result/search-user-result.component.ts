import { AfterViewInit, Component, ElementRef, HostListener, OnChanges, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MainComponent } from '../main/main.component';
import { FriendrelationshipService } from '../services/friendrelationship.service';
import { UsermiddlewareService } from '../services/usermiddleware.service';

@Component({
  selector: 'app-search-user-result',
  templateUrl: './search-user-result.component.html',
  styleUrls: ['./search-user-result.component.css']
})
export class SearchUserResultComponent implements OnInit,OnChanges  {

  constructor(
    private userservice:UsermiddlewareService,
    private friendship:FriendrelationshipService,
    private fb:FormBuilder,

  ) { 

  }
  
  ngAfterViewInit(){
  
  }

  data:any;
  searchbox:any;
  userdata:any;
  displaybtn:boolean = false;
  totalLength:any;

  searchForm:any;
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

// @HostListener("document:click",['$event'])
// clickedOut(event:any) {
//   if(this.searchDiv.nativeElement.contains(event.target)){
//     console.log("in box");
//     this.displaybtn=true;
//     // this.friendship.inputblur.next(true);
//   }else if(!this.searchDiv.nativeElement.contains(event.target)){ 
       
    
//       this.friendship.inputblur.subscribe((res: any)=>{
//         if(res==true){
//           console.log("out box");
//           this.displaybtn=true;

//           // this.friendship.searchBoxVisibility.next(false);
//         }else{
//           this.friendship.searchBoxVisibility.next(false);
//           console.log("out else box");

//         }
//       })
//       // this.friendship.searchBoxVisibility.next(false);
//   }
// }



}
