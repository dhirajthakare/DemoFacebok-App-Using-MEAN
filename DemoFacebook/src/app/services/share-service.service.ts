import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ShareServiceService {

  public postSavedSource = new BehaviorSubject<boolean>(false);
  // postSavedObs = this.postSavedSource.asObservable();

  // changePostSaved(saved:boolean){
  //   this.postSavedSource.next(saved);
  // }

  constructor() { }



}
