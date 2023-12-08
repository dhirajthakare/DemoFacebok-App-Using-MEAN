import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-accept-call',
  templateUrl: './accept-call.component.html',
  styleUrls: ['./accept-call.component.scss'],
})
export class AcceptCallComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDiaRef: MatDialogRef<AcceptCallComponent>
  ) {}

  ngOnInit(): void {}

  acceptCall() {
    let newUrl = this.data.chatURL.split('&')[0] + `&&callUser=${btoa('receivedCall')}`;
    window.open(`${newUrl}`, 'popup', 'width=1000,height=1000');
    this.matDiaRef.close();
  }

  rejectCall() {
    this.matDiaRef.close();
  }
}
