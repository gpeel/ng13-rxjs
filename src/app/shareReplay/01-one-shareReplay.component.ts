import {Component, OnInit} from '@angular/core';
import {delay, Observable, of, shareReplay, Subscription, tap} from 'rxjs';
import {refCountLogger} from '../_utils-behavior-subject/ref-count-logger-operator';
import {State} from '../typeahead/state';

/**
 * subscribing triggers reaction on the source
 * POssible test
 *    with
 *    shareReplay({bufferSize: 1, refCount: true}),
 *    finalize(() => { console.log('Finalize apiData$ after shareReplay'); })
 *    shareReplay(1) <=> shareReplay({bufferSize: 1, refCount: false})
 */
@Component({
  selector: 'app-root',
  template: `
    <div class="m-4">
      apiData$ Subscription 1 : {{this.subsriptionApi1 ? 'Closed?' + this.subsriptionApi1.closed : 'undefined'}}
      <div>Data:
        <div>{{data1 |json}}</div>
      </div>
      <div>
        <button (click)="onClickSubscribeApi1()" [disabled]="subsriptionApi1">Subscribe-1-to-apiData$</button>
      </div>
      <div>
        <button (click)="onClickUNSubscribeApi1()" [disabled]="!subsriptionApi1">Unsub-1-to-apiData$</button>
      </div>
    </div>
    <div class="m-4">
      apiData$ Subscription 2 : {{this.subsriptionApi2 ? 'Closed?' + this.subsriptionApi2.closed : 'undefined'}}
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
export class OneShareReplay_01_Component implements OnInit {
  data1: State | undefined;
  data2: State | undefined;
  counter = 2;

  subsriptionApi1: Subscription | undefined;
  subsriptionApi2: Subscription | undefined;

  apiData$ = this.findByFakeHttp().pipe(
    shareReplay(1),
    refCountLogger(c => console.log('apiData$ aftershareReplay subscribers=', c)),
  );

  ngOnInit(): void {
    console.log('INIT');
  }

  onClickSubscribeApi1() {
    console.log('Subscribing 1');
    // with first() or not the cache works OK
    // this.subsriptionApi1 = this.apiData$.pipe(first()).subscribe(w => {
    this.subsriptionApi1 = this.apiData$.subscribe(w => {
      console.log('RECEIVING new data for 1', w);
      this.data1 = w;
    });
    console.log('closed?', this.subsriptionApi1!.closed);
  }

  onClickSubscribeApi2() {
    console.log('Subscribing 2');
    this.subsriptionApi2 = this.apiData$.subscribe(w => {
      console.log('RECEIVING new data for 2', w);
      this.data2 = w;
    });
  }

  onClickUNSubscribeApi1() {
    if (this.subsriptionApi1) {
      console.log('Unsubscribing 1');
      this.subsriptionApi1.unsubscribe();
      this.subsriptionApi1 = undefined;
      this.data1 = undefined;
    }
  }

  onClickUNSubscribeApi2() {
    if (this.subsriptionApi2) {
      console.log('Unsubscribing 2');
      this.subsriptionApi2.unsubscribe();
      this.subsriptionApi2 = undefined;
      this.data2 = undefined;
    }
  }


  findByFakeHttp(): Observable<State> {
    return of({name: 'pipo', id: this.counter++, abbreviation: 'GG'})
      .pipe(
        delay(3000),
        refCountLogger(c => console.log('findFakeHTTP subscribers=', c)),
        tap(v => console.log('HTTP executed **************************', v)),
      );
  }


}
