import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/common/services/shared-data.service';

@Component({
  selector: 'app-messanger',
  templateUrl: './messanger.component.html',
  styleUrls: ['./messanger.component.scss']
})
export class MessangerComponent implements OnInit {

  constructor(private sharedData:SharedDataService) { }

  ngOnInit(): void {
    this.sharedData.changeTitle('Deskbook | Messanger');
  }

}
