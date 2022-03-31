import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {State} from './state';
import {StatesHttp} from './states.http';

@Injectable({
  providedIn: 'root'
})
export class StatesResolver implements Resolve<State[]> {

  constructor(private statesHttp: StatesHttp) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<State[]> {
    return this.statesHttp.findAll();
  }
}
