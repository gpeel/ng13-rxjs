import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {catchError, Observable, throwError} from 'rxjs';
import {StatesCache33WithBehaviorSubject} from './states-cache-33-with-behavior-subject.service';

@Injectable({
  providedIn: 'root'
})
export class StatesCached33BehaviorSubjectResolver implements Resolve<void> {

  constructor(private statesCache33WithBehaviorSubject: StatesCache33WithBehaviorSubject) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void> {
    /**
     * HERE we should add a catchError.
     * It is possible and even advised ;)
     */
    return this.statesCache33WithBehaviorSubject.findAllCached()
      .pipe(
        catchError(e => {
          alert('ERROR fetching HTTP data:' + JSON.stringify(e));
          return throwError(e);
        })
      );
  }
}
