import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/common/services/shared-data.service';

@Component({
  selector: 'app-messanger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {

  constructor(private sharedData:SharedDataService) { }

  ngOnInit(): void {
    this.sharedData.changeTitle('Deskbook | Messenger');
  }

}
