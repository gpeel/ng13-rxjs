import {Component, OnInit} from '@angular/core';
import {finalize, Observable, of, shareReplay, Subject, Subscription, tap} from 'rxjs';
import {map} from 'rxjs/operators';
import {refCountLogger} from '../_utils-behavior-subject/ref-count-logger-operator';
import {State} from '../typeahead/state';
import {StatesHttp} from '../typeahead/states.http';

/**
 *
 */
@Component({
  selector: 'app-root',
  template: `
    <div class="m-4">
      <button (click)="sendDataIntoHTTP()" [disabled]="httpSubject.isStopped">Send Http data</button>
    </div>
    <div class="m-4">
      <button (click)="closeHTTP()" [disabled]="httpSubject.isStopped">Complete HTTP Stream</button>
    </div>

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

    <div class="m-4">
      DATA$ Subscription 1 : {{this.subsriptionsData1 ? 'On' : 'undefined'}}
      <div>Data:
        <div>{{data1 |json}}</div>
      </div>
      <div>
        <button (click)="onClickSubscribeData1()" [disabled]="subsriptionsData1">Subscribe-1-to-data$</button>
      </div>
      <div>
        <button (click)="onClickUNSubscribeData1()" [disabled]="!subsriptionsData1">Unsub-1-to-data$</button>
      </div>
    </div>
    <div class="m-4">
      DATA$ Subscription 2 : {{this.subsriptionsData2 ? 'On' : 'undefined'}}
      <div>Data:
        <div>{{data2 |json}}</div>
      </div>
      <div>
        <button (click)="onClickSubscribeData2()" [disabled]="subsriptionsData2">Subscribe-2-to-data$</button>
      </div>
      <div>
        <button (click)="onClickUNSubscribeData2()" [disabled]="!subsriptionsData2">Unsub-2-to-data$</button>
      </div>
    </div>

  `,
})
export class ChainedShareReplay_07_Full_Component implements OnInit {
  work1: State | undefined;
  work2: State | undefined;
  data1: State[] | undefined;
  data2: State[] | undefined;

  httpSubject = new Subject<State>();
  counterOfHttpData = 0;

  subsriptionsWork1: Subscription | undefined;
  subsriptionsWork2: Subscription | undefined;
  subsriptionsData1: Subscription | undefined;
  subsriptionsData2: Subscription | undefined;

  // apiData$ = this.findFirst().pipe(
  apiData$ = this.findNeverEnding().pipe(
    tap(() => console.log('Data Fetched')),
    shareReplay(1),
    // shareReplay({bufferSize: 1, refCount: true}), // (line-MARKER-1)
    refCountLogger(c => console.log('apiData$ after shareReplay subscribers=', c)),
    finalize(() => { console.log('Finalize apiData$ after shareReplay'); })
  );

  work$ = this.apiData$.pipe(
    tap(() => console.log('Building Controls ¤¤¤¤¤')),
    map(s => ({...s, name: 'BUILDING'})),
    refCountLogger(c => console.log('work$ before shareReplay subscribers=', c)),
    shareReplay(1), // here we cache the BUILDING computation
    // shareReplay({bufferSize: 1, refCount: true}), // (line-MARKER-2) // here the BUILDING computation is NOT cached
    refCountLogger(c => console.log('work$ after shareReplay subscribers=', c)),
    finalize(() => { console.log('Finalize Work$'); })
  );

  data$ = this.work$.pipe(
    tap(() => console.log('Computed Data ¤¤¤¤¤')),
    map(s => ({...s, name: 'COMPUTED'})), // This computation is NOT cache
    finalize(() => { console.log('Finalize data$'); })
  );

  constructor(private statesHttp: StatesHttp) {
  }

  ngOnInit(): void {
    console.log('INIT');
    // this.data$.subscribe(d => this.data = d);
  }

  onClickUNSubscribeData1() {
    if (this.subsriptionsData1) {
      console.log('Unsubscribing data1');
      this.subsriptionsData1.unsubscribe();
      this.subsriptionsData1 = undefined;
      this.data1 = undefined;
    }
  }

  onClickUNSubscribeData2() {
    if (this.subsriptionsData2) {
      console.log('Unsubscribing data2');
      this.subsriptionsData2.unsubscribe();
      this.subsriptionsData2 = undefined;
      this.data2 = undefined;
    }
  }

  onClickUNSubscribeWork1() {
    if (this.subsriptionsWork1) {
      console.log('Unsubscribing 1');
      this.subsriptionsWork1.unsubscribe();
      this.subsriptionsWork1 = undefined;
      this.work1 = undefined;
    }
  }

  onClickUNSubscribeWork2() {
    if (this.subsriptionsWork2) {
      console.log('Unsubscribing 2');
      this.subsriptionsWork2.unsubscribe();
      this.subsriptionsWork2 = undefined;
      this.work2 = undefined;
    }
  }


  onClickSubscribeData1() {
    console.log('Subscribing data1');
    this.subsriptionsData1 = this.data$.subscribe(d => {
      console.log('RECEIVING new data for 1', d);
      this.data1 = d;
    });
  }

  onClickSubscribeData2() {
    console.log('Subscribing data2');
    this.subsriptionsData2 = this.data$.subscribe(d => {
      console.log('RECEIVING new data for 2', d);
      this.data2 = d;
    });
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
      this.work2 = w;
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

  sendDataIntoHTTP() {
    this.httpSubject.next({name: 'pipo', id: 2, abbreviation: 'GG' + this.counterOfHttpData++});
  }

  closeHTTP() {
    this.httpSubject.complete();
    console.log(this.httpSubject);
  }


  findNeverEnding(): Observable<State> {
    return this.httpSubject.pipe(
      tap(v => { console.log('Pseudo HTTP ¤¤¤¤¤', v); }),
      finalize(() => { console.log('Finalize HTTP'); })
    );
  }

}
