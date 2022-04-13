import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {map} from 'rxjs/operators';
import {AbstractBehaviorSubjectService} from '../../../_utils-behavior-subject/abstract-behavior-subject.service';
import {State} from '../../state';
import {StatesHttp} from '../../states.http';

const INITIAL_STATES: State[] = [];

@Injectable({
  providedIn: 'root'
})
export class StatesCache02WithBehaviorSubject extends AbstractBehaviorSubjectService<State[]> {

  constructor(private statesHttp: StatesHttp) {
    super();
    super.createStore(INITIAL_STATES);
  }

  /**
   * Since it is an action (like in Redux) it returns a VOID event (or error if any),
   * and client should subscribe to the subject$ to get the data.
   * The action juts return success/error (like NGXS)
   */
  findAll(): Observable<void> {
    return this.statesHttp.findAll()
      .pipe(
        tap(s => this.next(s)),
        map(() => undefined)
      );
  }

}
