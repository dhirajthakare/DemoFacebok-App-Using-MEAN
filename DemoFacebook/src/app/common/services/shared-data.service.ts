import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  constructor(private setTitle: Title) {}

  ActiveAccountHolder = new BehaviorSubject('');
  public postSavedSource = new BehaviorSubject<boolean>(false);
  public editProfileSave = new BehaviorSubject<boolean>(false);
  public updatedUserDetails = new BehaviorSubject<boolean>(false);

  changeTitle(StringTitle: string) {
    this.setTitle.setTitle(StringTitle);
  }

  isLoginUser() {
    return !!localStorage.getItem('accountToken');
  }
  getSelectedDate(obj: any, field: string) {
    let scheduleDate =
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
    return scheduleDate;
  }
}
