import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/common/services/shared-data.service';

@Component({
  selector: 'app-account-create-login',
  templateUrl: './account-create-login.component.html',
  styleUrls: ['./account-create-login.component.scss']
})
export class AccountCreateLoginComponent implements OnInit {

constructor(
  private comman:SharedDataService ,
) { }

ngOnInit(): void {
  this.comman.changeTitle('Login Accont');   
}

}
