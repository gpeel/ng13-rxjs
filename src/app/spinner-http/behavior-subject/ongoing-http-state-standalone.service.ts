import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

const INITIAL_ONGOING_VALUE = false;

@Injectable({
  providedIn: 'root'
})
export class OngoingHttpStateStandaloneService {

  private ongoing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(INITIAL_ONGOING_VALUE);

  constructor() {
  }

  /**
   * client is interested by flow of ongoing data async
   */
  getOngoing$() {
    return this.ongoing$.asObservable();
  }

  next(ongoing: boolean) {
    this.ongoing$.next(ongoing);
  }

}



