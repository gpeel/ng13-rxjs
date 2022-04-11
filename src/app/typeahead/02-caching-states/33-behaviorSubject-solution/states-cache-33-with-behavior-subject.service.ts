import {Injectable} from '@angular/core';
import {Observable, shareReplay, tap} from 'rxjs';
import {map} from 'rxjs/operators';
import {AbstractBehaviorSubjectService} from '../../../_utils-behavior-subject/abstract-behavior-subject.service';
import {State} from '../../state';
import {StatesHttp} from '../../states.http';

const INITIAL_STATES: State[] = [];

@Injectable({
  providedIn: 'root'
})
export class StatesCache33WithBehaviorSubject extends AbstractBehaviorSubjectService<State[]> {

  cachedCall$ = this.statesHttp.findAll()
    .pipe(
      shareReplay(1),
      tap(s => this.next(s)),
      map(() => undefined)
    );

  constructor(private statesHttp: StatesHttp) {
    super();
    super.createStore(INITIAL_STATES);
  }

  /**
   * If it's an action it should return a VOID event (or error if any),
   * and client should subscribe to the subject$
   */
  findAllRefresh(): Observable<void> {
    return this.statesHttp.findAll()
      .pipe(
        tap(s => this.next(s)),
        map(() => undefined)
      );
  }

  findAllCached(): Observable<void> {
    return this.cachedCall$;
  }


}
