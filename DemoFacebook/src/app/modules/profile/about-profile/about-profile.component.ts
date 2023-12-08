import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/common/services/shared-data.service';

@Component({
  selector: 'app-about-profile',
  templateUrl: './about-profile.component.html',
  styleUrls: ['./about-profile.component.scss']
})
export class AboutProfileComponent implements OnInit {

  constructor(private sharedService:SharedDataService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.sharedService.changeTitle('DeskBook | About');
    }, 500);
  }

}
