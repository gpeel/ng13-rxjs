import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {State} from './state';
import {StatesHttp} from './states.http';
import {StatesRepository} from './with-elf/states.repository';

@Injectable({
  providedIn: 'root'
})
export class StatesCache {

  constructor(private statesHttp: StatesHttp,
              private statesRepository: StatesRepository) { }

  findAll(): Observable<State[]> {
    return this.statesHttp.findAll()
      .pipe(
        tap(s => this.statesRepository.setStates(s))
      );
  }

}
