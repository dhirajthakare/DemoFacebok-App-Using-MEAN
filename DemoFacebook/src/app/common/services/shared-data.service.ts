import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor(private settitle:Title) { }

  ActiveAccountHolder = new BehaviorSubject('');
  public postSavedSource = new BehaviorSubject<boolean>(false);
  public editProfileSave = new BehaviorSubject<boolean>(false);
  public updatedUserDetails = new BehaviorSubject<boolean>(false);

  changeTitle(StringTitle:string){
    this.settitle.setTitle(StringTitle);
  }

  isLoginUser(){
    return !!localStorage.getItem('accountToken');
  }

}
