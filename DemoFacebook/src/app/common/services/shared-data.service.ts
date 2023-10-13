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
  public updatedUserDetails = new BehaviorSubject<any>(false);

  changeTitle(StringTitle:string){
    this.settitle.setTitle(StringTitle);
  }

  isLoginUser(){
    return !!localStorage.getItem('accountToken');
  }
  getSelectedDate(obj: any, field: string) {
    let scheduledate =
      obj[field] === null
        ? ''
        : obj &&
          <any>new Date(obj[field]) !== 'Invalid Date' &&
          !isNaN(<any>new Date(obj[field]))
        ? new Date(
            new Date(obj[field]).setDate(new Date(obj[field]).getDate() + 1)
          )
            .toISOString()
            .slice(0, 10)
        : obj[field] || obj[field] || '';
    return scheduledate;
  }

}
