import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {combineLatest, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {State} from '../state';


@Component({
  selector: 'state-filter-local',
  template: `
    <input type="text" [formControl]="filter" placeholder="Filter states...">

    <ul>
      <li *ngFor="let state of filteredStates$ | async">{{state.name}}</li>
    </ul>

  `
})
export class StateFilterLocalComponent {

  states$: Observable<State[]>;
  filteredStates$: Observable<State[]>;
  filter: FormControl;
  filter$: Observable<string>;

  /**
   * with the saync pipe there is no way to catch the errors !
   */
  constructor(private httpClient: HttpClient) {
    this.states$ = this.httpClient.get<State[]>('http://localhost:3300/states');
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.filteredStates$ = combineLatest([this.states$, this.filter$]).pipe(
      map(([states, filterString]) => states.filter(state => state.name.indexOf(filterString) !== -1))
    );
  }

}
