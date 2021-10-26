import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor( private _location :Location) { }

  ngOnInit(): void {
  }

  locationback(){
    console.log("out");
    this._location.back();
    // window.history.back();
  }
}
