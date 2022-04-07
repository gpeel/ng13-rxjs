import {Component, OnInit} from '@angular/core';
import {finalize, shareReplay, tap} from 'rxjs';
import {map} from 'rxjs/operators';
import {StatesHttp} from '../typeahead/states.http';

/**
 * The difference betwwen slide shareReplay() examples is that now the source is NOT a click$ Subject() but a unicast
 * source.
 * This means that subscribing triggers reaction on the sourcewhich was NOT the case previously.
 * It is more complex but also more useful to cache real HTTP requests when you "pull" data.
 */
@Component({
  selector: 'app-root',
  template: `
    <div class="m-4">
      <div *ngIf="work$ |async as work">{{ work | json}}      </div>
      <div *ngIf="data$ |async as data">{{ data | json}}      </div>
    </div>

  `,
})
export class ChainedShareReplayComponent implements OnInit {

  /**
   * - we have all finalize directly because the HTTP completes and unsub downward every potential client
   *
   * QUESTION (for trainees) each time we arrive to this component we have at least one HTTP (mocked or not) Request.
   * What could we change to have ONLY a cache accross Navigation ?
   * So that the first coming to that page loads .. and ONE HTTP
   * and when Nav out, nav back => no HTTP
   * ?
   */

  apiData$ = this.statesHttp.findFirst().pipe(
    tap(() => console.log('Data Fetched')),
    shareReplay({bufferSize: 1, refCount: false}), // <= default <=>  shareReplay(1)
    // shareReplay({bufferSize: 1, refCount: true}),
    finalize(() => { console.log('Finalize HTTP after shareReplay'); })
  );

  work$ = this.apiData$.pipe(
    tap(() => console.log('Building Works')),
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

  }

}
