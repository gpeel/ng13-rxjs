import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {AbstractBehaviorSubjectService} from '../../_utils-behavior-subject/abstract-behavior-subject.service';
import {State} from '../state';
import {StatesHttp} from '../states.http';

const INITIAL_STATES: State[] = [];

@Injectable({
  providedIn: 'root'
})
export class StatesCache02 extends AbstractBehaviorSubjectService<State[]> {

  constructor(private statesHttp: StatesHttp) {
    super();
    super.createStore(INITIAL_STATES);
  }

  findAll(): Observable<State[]> {
    return this.statesHttp.findAll()
      .pipe(
        tap(s => this.next(s)),
        // what RxJS operator to add to mak a cache ?
      );
  }

}
