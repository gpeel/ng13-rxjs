import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {catchError, Observable, throwError} from 'rxjs';
import {State} from '../state';
import {StatesCache01} from './states.cache-01';

@Injectable({
  providedIn: 'root'
})
export class StatesCachedResolver implements Resolve<State[]> {

  constructor(private statesCache01: StatesCache01) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<State[]> {
    /**
     * HERE we should add a catchError.
     * It is possible and even advised ;)
     */
    return this.statesCache01.findAll()
      .pipe(
        catchError(e => {
          alert('ERROR fetching HTTP data:' + JSON.stringify(e));
          return throwError(e);
        })
      );
  }
}
