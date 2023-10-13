import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/common/services/shared-data.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss'],
})
export class RecoverComponent implements OnInit {
  constructor(private sharedService: SharedDataService) {}

  ngOnInit(): void {
    this.sharedService.changeTitle('Reset Password');
  }
}
