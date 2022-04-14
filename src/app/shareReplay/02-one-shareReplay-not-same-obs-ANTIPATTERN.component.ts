import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {State} from '../typeahead/state';
import {StateHttpService} from './state-http.service';

/**
 * Factorizing into a Service seems good, no ?
 * Well if you use shareReplay inside the findByHttp() beware of using the SAME observable ALL the time.
 * If you recreate a new Observable containing shareReplay for each new Subscriber => those Subscriber will be each
 * alone on the flow. So no cache !
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
export class OneShareReplay_02_not_same_observable_Component implements OnInit {
  data1: State | undefined;
  data2: State | undefined;

  subsriptionApi1: Subscription | undefined;
  subsriptionApi2: Subscription | undefined;

  // replacing local code and abstracting in a dedicated service
  // apiData$ = this.findByFakeHttp().pipe(
  //   shareReplay(1),
  //   refCountLogger(c => console.log('apiData$ aftershareReplay subscribers=', c)),
  // );
  // apiData$ = this.stateHttpService.findFakeCachedHttp();

  constructor(private stateHttpService: StateHttpService) {}

  ngOnInit(): void {
    console.log('INIT');
  }

  onClickSubscribeApi1() {
    console.log('Subscribing 1');
    // with first() or not the cache works OK
    // this.subsriptionApi1 = this.apiData$.pipe(first()).subscribe(w => {
    this.subsriptionApi1 = this.stateHttpService.findFakeCachedHttp().subscribe(w => {
      console.log('RECEIVING new data for 1', w);
      this.data1 = w;
    });
    console.log('closed?', this.subsriptionApi1!.closed);
  }

  onClickSubscribeApi2() {
    console.log('Subscribing 2');
    // this.subsriptionApi2 = this.apiData$.subscribe(w => {
    this.subsriptionApi2 = this.stateHttpService.findFakeCachedHttp().subscribe(w => {
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


}
