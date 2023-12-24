import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(private _location :Location) { }

  ngOnInit(): void {
  }

  locationBack(){
    this._location.back();
    // window.history.back();
  }

}
