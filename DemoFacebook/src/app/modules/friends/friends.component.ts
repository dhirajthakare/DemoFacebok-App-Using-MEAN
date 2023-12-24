import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/common/services/shared-data.service';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  
  constructor(
    private sharedData:SharedDataService
    ) { }

  ngOnInit(): void {
    this.sharedData.changeTitle('DeskBook | Friends');
  }

  token:any;

}
