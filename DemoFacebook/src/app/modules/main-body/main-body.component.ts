import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/common/services/shared-data.service';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.scss'],
})
export class MainBodyComponent implements OnInit {
  constructor(
    private sharedata: SharedDataService
  ) {}
  data: any;
  ngOnInit(): void {
    this.sharedata.changeTitle('Deskbook | Home');
  }
}
