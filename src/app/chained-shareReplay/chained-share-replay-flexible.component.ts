import {Component, OnInit} from '@angular/core';
import {finalize, Observable, of, shareReplay, Subject, tap} from 'rxjs';
import {map} from 'rxjs/operators';
import {State} from '../typeahead/state';
import {StatesHttp} from '../typeahead/states.http';

@Component({
  selector: 'app-root',
  template: `
    <div class="m-4">
      <div *ngIf="work">{{ work | json}}      </div>
      <div *ngIf="data">{{ data | json}}      </div>
    </div>

  `,
})
export class ChainedShareReplayFlexibleComponent implements OnInit {
  work: State | undefined;
  data: State | undefined;

  // apiData$ = this.statesHttp.findFirst().pipe(
  // apiData$ = this.statesHttp.findNeverEnding().pipe(
  apiData$ = this.statesHttp.findNeverEndingSecondData().pipe(
    tap(() => console.log('Data Fetched')),
    shareReplay({bufferSize: 1, refCount: false}), // <= default <=>  shareReplay(1)
    // shareReplay({bufferSize: 1, refCount: true}),
    finalize(() => { console.log('Finalize HTTP after shareReplay'); })
  );

  work$ = this.apiData$.pipe(
    tap(() => console.log('Building Controls')),
    map(s => ({...s, name: 'BUILDING'})),
    shareReplay(1),
    // shareReplay({bufferSize: 1, refCount: true}),
    finalize(() => { console.log('Finalize Work$'); })
  );

  data$ = this.work$.pipe(
    tap(() => console.log('Computed Data')),
    map(s => ({...s, name: 'COMPUTED'})),
    finalize(() => { console.log('Finalize data$'); })
  );

  constructor(private statesHttp: StatesHttp) {
  }

  ngOnInit(): void {
    this.work$.subscribe(w => this.work = w);
    this.data$.subscribe(d => this.data = d);
  }


  findFirst(): Observable<State> {
    return of({name: 'pipo', id: 2, abbreviation: 'GG'});
  }

  findNeverEnding(): Observable<State> {
    const s = new Subject<State>();
    setTimeout(() => {s.next({name: 'pipo', id: 2, abbreviation: 'GG'});}, 1000);
    return s.pipe(
      tap(v => { console.log('Pseudo HTTP', v); }),
      finalize(() => { console.log('Finalize HTTP'); })
    );
  }

  findNeverEndingSecondData(): Observable<State> {
    const s = new Subject<State>();
    setTimeout(() => {s.next({name: 'pipo', id: 2, abbreviation: 'GG'});}, 1000);
    setTimeout(() => {s.next({name: 'pipo2', id: 3, abbreviation: 'ZZ'});}, 8000);
    return s.pipe(
      tap(v => { console.log('Pseudo HTTP', v); }),
      finalize(() => { console.log('Finalize HTTP'); })
    );
  }

}
