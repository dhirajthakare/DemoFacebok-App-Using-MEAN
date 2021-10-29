import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateloginserviceService } from '../services/createloginservice.service';

@Component({
  selector: 'app-create-and-login',
  templateUrl: './create-and-login.component.html',
  styleUrls: ['./create-and-login.component.css']
})
export class CreateAndLoginComponent implements OnInit {

  
  constructor(
    public service : CreateloginserviceService,
    private router : Router,
  ) { }
  
  ngOnInit(): void {
      if(localStorage.getItem('loggedin')=="true"){
        this.router.navigate(['/facebook']);

      }
    
  }




}
