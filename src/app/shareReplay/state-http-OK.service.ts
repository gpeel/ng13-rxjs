import {Injectable} from '@angular/core';
import {delay, Observable, of, shareReplay, tap} from 'rxjs';
import {refCountLogger} from '../_utils-behavior-subject/ref-count-logger-operator';
import {State} from '../typeahead/state';

const INITIAL_STATES: State[] = [];

@Injectable({
  providedIn: 'root'
})
export class StateHttpOKService {
  counter = 2;

  find$ = of({name: 'pipo', id: this.counter++, abbreviation: 'GG'})
    .pipe(
      delay(1000),
      refCountLogger(c => console.log('findFakeHTTP subscribers=', c)),
      tap(v => console.log('HTTP executed **************************', v)),
      shareReplay(1),
      refCountLogger(c => console.log('apiData$ aftershareReplay subscribers=', c)),
    );


  /**
   * OK
   */
  findFakeCachedHttp(): Observable<State> {
    return this.find$;
  }


}
