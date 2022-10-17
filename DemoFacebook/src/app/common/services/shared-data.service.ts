import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  
  ActiveAccountHolder = new BehaviorSubject('');
  public postSavedSource = new BehaviorSubject<boolean>(false);
  public editProfileSave = new BehaviorSubject<boolean>(false);



  constructor(private settitle:Title) { }

  changeTitle(StringTitle:string){
    this.settitle.setTitle(StringTitle);
  }

  isLoginUser(){
    return !!localStorage.getItem('accountToken');
  }

}
