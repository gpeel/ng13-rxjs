import {Component, OnInit} from '@angular/core';
import {finalize, Observable, of, shareReplay, Subject, Subscription, tap} from 'rxjs';
import {refCountLogger} from '../_utils-behavior-subject/ref-count-logger-operator';
import {State} from '../typeahead/state';

/**
 * Here we modelize an HTTP source with a Subject().
 * We can test sending multiple HTTP events (not common) and also complete the source when we want:
 * ie before or after a client unsubscribes. So we can show some interesting behavior.
 *
 * When shareReplay does have its upward subcribe going on (and at most only ONE is possible),
 * then if there is an unsubscribes from downward => then it clear its cache.
 * If the upward souce completes before, then the cache stays.
 * That is the tricky part.
 *
 * Scenario1
 *  shareReplay(1) in apiData$ (line-MARKER-1)
 *  THen even when no subscribers left (once you have at least had a subscriber once before) when "Send HTTP Data" =>
 *  the data is in cache into the (line-MARKER-1)  and when a new subscriber comes back => it receives the data
 * immediately.
 * ANd NOW even if you don't have subscribers you can click on "Send HTTP Data" and the cache fills even without
 * showing it on screen!
 * => if a subscriber 1 or 2 comes back, he will receive the latest caches HTTP
 *
 * Scenario2
 * If I activate
 *     shareReplay({bufferSize: 1, refCount: true}),
 * Both on apiData$ (line-MARKER-1) and work$ on (line-MARKER-2 )
 * Then I need a subcriber alive to fill the shareReplay cache.
 * => click "Subscribe-1-to-work$'
 * => then when clicking "Send HTTP data" => it fills the cache, and THEN the subscriber(s) receives it.
 * WHEN no subscribers, if I "Send Http Data" nothing happens in the apiData$ stream.
 * => Subscribe-2 => ok no more HTTP, cache working
 * => unsub both => CLEARS the Caches because refcount=true
 * => resub  => THE subscribers DO NOT RECEIVE anythng, they are just waiting for next HTTP send.
 * That's because the cache has been cleared.
 * => click send => both receive data
 *
 * Scenario3
 * Simulating without the first() in scenario from BAD
 * Activate Refcount
 * shareReplay({bufferSize: 1, refCount: true}), // (line-MARKER-1)
 * - Subscribe-1
 * - Send-Http-data
 * - Complete-HTTP-Stream => this will lock the cache
 * - unsub1 (the cache is kept)
 * - Subscribe-1 (or 2) they receive the cache
 *
 * Scenario4
 * Simulating WITH the first() in scenario from BAD
 * Activate Refcount
 * shareReplay({bufferSize: 1, refCount: true}), // (line-MARKER-1)
 * - Subscribe-1
 * - Send-Http-data
 * - unsub1 (the cache WILL be cleared)
 * - Complete-HTTP-Stream
 * - Subscribe-1 (or 2) they don't receive anything
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
      WORKS$ Subscription 1 : {{this.subsriptionApi1 ? 'On' : 'undefined'}}
      <div>Data:
        <div>{{api1 |json}}</div>
      </div>
      <div>
        <button (click)="onClickSubscribeApi1()" [disabled]="subsriptionApi1">Subscribe-1-to-api$</button>
      </div>
      <div>
        <button (click)="onClickUNSubscribeApi1()" [disabled]="!subsriptionApi1">Unsub-1-to-api$</button>
      </div>
    </div>
    <div class="m-4">
      WORKS$ Subscription 2 : {{this.subsriptionApi2 ? 'On' : 'undefined'}}
      <div>Data:
        <div>{{api2 |json}}</div>
      </div>
      <div>
        <button (click)="onClickSubscribeApi2()" [disabled]="subsriptionApi2">Subscribe-2-to-api$</button>
      </div>
      <div>
        <button (click)="onClickUNSubscribeApi2()" [disabled]="!subsriptionApi2">Unsub-2-to-api$</button>
      </div>
    </div>

  `,
})
export class OneShareReplay_04_multi_HTTP_Component implements OnInit {
  api1: State | undefined;
  api2: State | undefined;

  httpSubject = new Subject<State>();
  counterOfHttpData = 0;

  subsriptionApi1: Subscription | undefined;
  subsriptionApi2: Subscription | undefined;

  apiData$ = this.findNeverEnding().pipe(
    tap(() => console.log('Data Fetched')),
    // shareReplay(1), // shareReplay({bufferSize: 1, refCount: false}), // <= default <=>
    shareReplay({bufferSize: 1, refCount: true}), // (line-MARKER-1)
    refCountLogger(c => console.log('apiData$ after shareReplay subscribers=', c)),
    finalize(() => { console.log('Finalize apiData$ after shareReplay'); })
  );

  ngOnInit(): void {
    console.log('INIT');
  }

  onClickUNSubscribeApi1() {
    if (this.subsriptionApi1) {
      console.log('Unsubscribing 1');
      this.subsriptionApi1.unsubscribe();
      this.subsriptionApi1 = undefined;
      this.api1 = undefined;
    }
  }

  onClickUNSubscribeApi2() {
    if (this.subsriptionApi2) {
      console.log('Unsubscribing 2');
      this.subsriptionApi2.unsubscribe();
      this.subsriptionApi2 = undefined;
      this.api2 = undefined;
    }
  }

  onClickSubscribeApi1() {
    console.log('Subscribing 1');
    this.subsriptionApi1 = this.apiData$.subscribe(w => {
      console.log('RECEIVING new work for 1', w);
      this.api1 = w;
    });
  }

  onClickSubscribeApi2() {
    console.log('Subscribing 2');
    this.subsriptionApi2 = this.apiData$.subscribe(w => {
      console.log('RECEIVING new work for 2', w);
      this.api2 = w;
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
      tap(v => { console.log('Pseudo HTTP', v); }),
      finalize(() => { console.log('Finalize HTTP'); })
    );
  }

}
