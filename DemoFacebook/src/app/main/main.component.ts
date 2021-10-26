import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommanValuesService } from '../services/comman-values.service';
import { UsermiddlewareService } from '../services/usermiddleware.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
     private route:Router,
     private userservice:UsermiddlewareService
     ) { }
  data:any;
  ngOnInit(): void {
    
    if(localStorage.getItem('loggedin')!="true"){
      localStorage.setItem('error',"You need To Login")
      this.route.navigate(['']);
    }
    this.getcurrentuser();

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
