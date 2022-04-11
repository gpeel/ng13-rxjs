import {Injectable} from '@angular/core';
import {Observable, shareReplay} from 'rxjs';
import {State} from '../../state';
import {StatesHttp} from '../../states.http';

const INITIAL_STATES: State[] = [];

@Injectable({
  providedIn: 'root'
})
export class StatesCache01WithShareReplay {

  // V1
  private findAllCached$ = this.statesHttp.findAll().pipe(shareReplay(1));

  constructor(private statesHttp: StatesHttp) {
  }

  // V1
  findAll(): Observable<State[]> {
    return this.findAllCached$;
  }

  // V2 : is it cached with this solution ?
  // findAll(): Observable<State[]> {
  //   return this.statesHttp.findAll().pipe(shareReplay(1));
  // }

}
