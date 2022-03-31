import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {map, startWith} from 'rxjs/operators';
import {State} from './state';


@Component({
  selector: 'app-state-filter-local-simpler',
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
export class StateFilterLocalResolverComponent implements OnInit {
  filteredStates!: State[];
  filter: FormControl;
  states!: State[]; // take from Resolver

  constructor(private activatedRoute: ActivatedRoute) {
    this.filter = new FormControl('');
    this.states = activatedRoute.snapshot.data['states'];
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
