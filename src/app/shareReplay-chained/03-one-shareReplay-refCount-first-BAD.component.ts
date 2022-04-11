import {Component, OnInit} from '@angular/core';
import {finalize, Observable, of, shareReplay, Subscription, tap} from 'rxjs';
import {first} from 'rxjs/operators';
import {refCountLogger} from '../_utils-behavior-subject/ref-count-logger-operator';
import {State} from '../typeahead/state';

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
      WORKS$ Subscription 1 : {{this.subsriptionApi1 ? 'On' : 'undefined'}}
      <div>Data
        <div>{{data1 |json}}</div>
      </div>
      <div>
        <button (click)="onClickSubscribeApi1()" [disabled]="subsriptionApi1">Subscribe-1-to-apiData$ + first()
        </button>
      </div>
      <div>
        <button (click)="onClickUNSubscribeApi1()" [disabled]="!subsriptionApi1">Unsub-1-to-apiData$</button>
      </div>
    </div>
    <div class="m-4">
      WORKS$ Subscription 2 : {{this.subsriptionApi2 ? 'On' : 'undefined'}}
      <div>Data:
        <div>{{data2 |json}}</div>
      </div>
      <div>
        <button (click)="onClickSubscribeApi2()" [disabled]="subsriptionApi2">Subscribe-2-to-work$</button>
      </div>
      <div>
        <button (click)="onClickUNSubscribeApi2()" [disabled]="!subsriptionApi2">Unsub-2-to-work$</button>
      </div>
    </div>

  `,
})
export class OneShareReplay_03_refCount_BAD_Component implements OnInit {
  data1: State | undefined;
  data2: State | undefined;

  subsriptionApi1: Subscription | undefined;
  subsriptionApi2: Subscription | undefined;

  apiData$ = this.findFirst().pipe(
    // apiData$ = this.findNeverEnding().pipe(
    tap(() => console.log('Data Fetched')),
    // shareReplay(1), // <=> shareReplay({bufferSize: 1, refCount: false}),
    // CHANGED
    // CHANGED
    // CHANGED
    shareReplay({bufferSize: 1, refCount: true}),
    // CHANGED
    // CHANGED
    // CHANGED
    refCountLogger(c => console.log('apiData$ aftershareReplay subscribers=', c)),
    finalize(() => { console.log('Finalize apiData$ after shareReplay'); })
  );


  ngOnInit(): void {
    console.log('INIT');
  }

  onClickSubscribeApi1() {
    console.log('Subscribing 1');
    // FIRST causes PB !
    // FIRST causes PB !
    // FIRST causes PB !
    this.subsriptionApi1 = this.apiData$.pipe(first()).subscribe(w => {
      console.log('RECEIVING new data for 1', w);
      this.data1 = w;
    });
  }

  onClickSubscribeApi2() {
    console.log('Subscribing 2');
    this.subsriptionApi2 = this.apiData$.subscribe(w => {
      console.log('RECEIVING new data for 2', w);
      this.data1 = w;
    });
  }

  onClickUNSubscribeApi1() {
    if (this.subsriptionApi1) {
      console.log('Unsubscribing 1');
      this.subsriptionApi1.unsubscribe();
      this.subsriptionApi1 = undefined;
    }
  }

  onClickUNSubscribeApi2() {
    if (this.subsriptionApi2) {
      console.log('Unsubscribing 2');
      this.subsriptionApi2.unsubscribe();
      this.subsriptionApi2 = undefined;
    }
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
