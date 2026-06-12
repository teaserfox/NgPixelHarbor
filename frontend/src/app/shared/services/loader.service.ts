import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isShowed$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  show() {
    this.isShowed$.next(true);
  }

  hide() {
    this.isShowed$.next(false);
  }

}
