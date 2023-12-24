import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/common/services/shared-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private sharedService: SharedDataService
  ) {}


  ngOnInit(): void {
    this.sharedService.changeTitle('DeskBook | Profile');
  }

}
