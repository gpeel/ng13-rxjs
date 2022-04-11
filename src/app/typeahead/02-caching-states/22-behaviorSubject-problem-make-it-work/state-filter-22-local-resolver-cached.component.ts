import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {map, startWith} from 'rxjs/operators';
import {State} from '../../state';
import {StatesCache02WithBehaviorSubject} from './states-cache-22-with-behavior-subject.service';


@Component({
  selector: 'state-filter-local-cached',
  template: `
    <input type="text" [formControl]="filter" placeholder="Filter states...">

    <ul>
      <li *ngFor="let state of filteredStates">{{state.name}}</li>
    </ul>

  `
})
/**
 * The logic is simplified with a Resolver ....
 */
export class StateFilter22LocalResolverCachedComponent implements OnInit {
  filteredStates!: State[];
  filter: FormControl;
  states!: State[]; // take from Resolver

  constructor(private activatedRoute: ActivatedRoute,
              private statesCache02WithBehaviorSubject: StatesCache02WithBehaviorSubject) {
    this.filter = new FormControl('');
    // this.states = activatedRoute.snapshot.data['states'];
    // the data is no longer availalble direcltly but by a subscription to the BH

    // so now I could choose to get the data synchro, or asysnc, as I want
    // Here synchro
    this.states = this.statesCache02WithBehaviorSubject.getDataValue();
  }

  ngOnInit(): void {


    this.filter.valueChanges.pipe(
      startWith(''),
      map((input: string) => this.states.filter(s => s.name.toLocaleLowerCase().indexOf(input.toLocaleLowerCase()) !== -1))
    ).subscribe(s => {
      console.log('FILTERED', s);
      this.filteredStates = s;
    });
  }

}
