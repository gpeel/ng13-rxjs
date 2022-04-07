import {Component, OnInit} from '@angular/core';
import {finalize, Observable, of, shareReplay, Subscription, tap} from 'rxjs';
import {map} from 'rxjs/operators';
import {refCountLogger} from '../_utils-behavior-subject/ref-count-logger-operator';
import {State} from '../typeahead/state';
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
      WORKS$ Subscription 1 : {{this.subsriptionsWork1 ? 'On' : 'undefined'}}
      <div>Data:
        <div>{{work1 |json}}</div>
      </div>
      <div>
        <button (click)="onClickSubscribeWork1()" [disabled]="subsriptionsWork1">Subscribe-1-to-work$</button>
      </div>
      <div>
        <button (click)="onClickUNSubscribeWork1()" [disabled]="!subsriptionsWork1">Unsub-1-to-work$</button>
      </div>
    </div>
    <div class="m-4">
      WORKS$ Subscription 2 : {{this.subsriptionsWork2 ? 'On' : 'undefined'}}
      <div>Data:
        <div>{{work2 |json}}</div>
      </div>
      <div>
        <button (click)="onClickSubscribeWork2()" [disabled]="subsriptionsWork2">Subscribe-2-to-work$</button>
      </div>
      <div>
        <button (click)="onClickUNSubscribeWork2()" [disabled]="!subsriptionsWork2">Unsub-2-to-work$</button>
      </div>
    </div>

  `,
})
export class ChainedShareReplay_02_Flexible_one_event_HTTP_Component implements OnInit {
  work1: State | undefined;
  work2: State | undefined;
  data1: State[] | undefined;
  data2: State[] | undefined;


  subsriptionsWork1: Subscription | undefined;
  subsriptionsWork2: Subscription | undefined;
  subsriptionsData1: Subscription | undefined;
  subsriptionsData2: Subscription | undefined;

  apiData$ = this.findFirst().pipe(
    // apiData$ = this.findNeverEnding().pipe(
    tap(() => console.log('Data Fetched')),
    shareReplay({bufferSize: 1, refCount: false}), // <= default <=>  shareReplay(1)
    // shareReplay({bufferSize: 1, refCount: true}),
    refCountLogger(c => console.log('apiData$ aftershareReplay subscribers=', c)),
    finalize(() => { console.log('Finalize apiData$ after shareReplay'); })
  );

  work$ = this.apiData$.pipe(
    tap(() => console.log('Building Controls')),
    map(s => ({...s, name: 'BUILDING'})),
    refCountLogger(c => console.log('work$ before shareReplay subscribers=', c)),
    shareReplay(1),
    refCountLogger(c => console.log('work$ after shareReplay subscribers=', c)),
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
    console.log('INIT');
    // this.data$.subscribe(d => this.data = d);
  }

  onClickUNSubscribeWork1() {
    if (this.subsriptionsWork1) {
      console.log('Unsubscribing 1');
      this.subsriptionsWork1.unsubscribe();
      this.subsriptionsWork1 = undefined;
    }
  }

  onClickUNSubscribeWork2() {
    if (this.subsriptionsWork2) {
      console.log('Unsubscribing 2');
      this.subsriptionsWork2.unsubscribe();
      this.subsriptionsWork2 = undefined;
    }
  }


  onClickSubscribeWork1() {
    console.log('Subscribing 1');
    this.subsriptionsWork1 = this.work$.subscribe(w => {
      console.log('RECEIVING new work for 1', w);
      this.work1 = w;
    });
  }

  onClickSubscribeWork2() {
    console.log('Subscribing 2');
    this.subsriptionsWork2 = this.work$.subscribe(w => {
      console.log('RECEIVING new work for 2', w);
      this.work1 = w;
    });
  }


  findFirst(): Observable<State> {
    return of({name: 'pipo', id: 2, abbreviation: 'GG'})
      .pipe(
        refCountLogger(c => console.log('findFirst HTTP subscribers=', c)),
        tap(v => console.log('HTTP executed', v)),
        finalize(() => { console.log('Finalize HTTP'); })
      );
  }


}
