import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor(private settitle:Title) { }

  ActiveAccountHolder = new BehaviorSubject('');

  changeTitle(StringTitle:string){

    this.settitle.setTitle(StringTitle);

  }

}
