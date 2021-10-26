import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommanValuesService {

  constructor() { }

  ActiveAccountHolder = new BehaviorSubject('');

}
