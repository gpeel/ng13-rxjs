import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {catchError, Observable, throwError} from 'rxjs';
import {StatesCache02WithBehaviorSubject} from './states-cache-22-with-behavior-subject.service';

@Injectable({
  providedIn: 'root'
})
export class StatesCached22BehaviorSubjectResolver implements Resolve<void> {

  constructor(private statesCache02WithBehaviorSubject: StatesCache02WithBehaviorSubject) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void> {
    /**
     * HERE we should add a catchError.
     * It is possible and even advised ;)
     */
    return this.statesCache02WithBehaviorSubject.findAll()
      .pipe(
        catchError(e => {
          alert('ERROR fetching HTTP data:' + JSON.stringify(e));
          return throwError(e);
        })
      );
  }
}
