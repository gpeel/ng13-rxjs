import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {catchError, Observable, throwError} from 'rxjs';
import {State} from '../state';
import {StatesHttp} from '../states.http';

@Injectable({
  providedIn: 'root'
})
export class StatesResolver implements Resolve<State[]> {

  constructor(private statesHttp: StatesHttp) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<State[]> {
    /**
     * HERE we should add a catchError.
     * It is possible and even advised ;)
     */
    return this.statesHttp.findAll()
      .pipe(
        catchError(e => {
          alert('ERROR fetching HTTP data:' + JSON.stringify(e));
          return throwError(e);
        })
      );
  }
}
