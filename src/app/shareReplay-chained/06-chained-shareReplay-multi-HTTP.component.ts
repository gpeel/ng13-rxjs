import {Component, OnInit} from '@angular/core';
import {finalize, Observable, of, shareReplay, Subject, Subscription, tap} from 'rxjs';
import {map} from 'rxjs/operators';
import {refCountLogger} from '../_utils-behavior-subject/ref-count-logger-operator';
import {State} from '../typeahead/state';

/**
 * The difference between slide shareReplay() examples is that now the source is NOT a click$ Subject() but a unicast
 * source.
 * This means that subscribing triggers reaction on the sourcewhich was NOT the case previously.
 * It is more complex but also more useful to cache real HTTP requests when you "pull" data.
 *
 * When shareReplay does not have its upward subcribe going on (and only ONE is possible) => its cache is empty.
 * So when shareReplay() unsubscribes (meaning implicitly upward subscribes) it clear its cache.
 *
 * Scenario1
 * If I activate
 *     shareReplay({bufferSize: 1, refCount: true}),
 * Both on apiData$ (line-MARKER-1) and work$ on (line-MARKER-2 )
 * Then I need a subcriber alive to fill the shareReplay cache.
 * => click "Subscribe-1-to-work$'
 * => then when clicking "Send HTTP data" => it fills the cache, and THEN the subscriber(s) receives it.
 * WHEN no subscribers, if I "Send Http Data" nothing happens in the apiData$ and work$ stream, nothing is subscribed
 * to. So the Subject emits to nobody.
 * => Subscribe-2 => ok no more HTTP, cache working
 * => unsub both => CLEARS the Caches because refcount=true
 * => resub  => WILL FETCH AGAIN HTTP
 *
 * Scenario2
 *  shareReplay(1) in apiData$ (line-MARKER-1)
 *  And whatever below in (line-MARKER-2) ie shareReplay(1) or shareReplay({bufferSize: 1, refCount: true}),
 *  THen even when no subscribers left (once you have at least had a subscriber once before) when "Send HTTP Data" =>
 *  the data is in cache into the (line-MARKER-1)  and when a new subscriber comes back => it receives the data
 * immediately.
 * Same for (line-MARKER-2) which caches the 'Building Controls'
 * ANd NOW even if you don't have subscribers you can click on "Send HTTP Data" and the cache fills even without
 * showing it on screen!
 * => if a subscriber 1or 2 comes back he will receive the latest caches HTTP and 'Building Controls'
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

  `,
})
export class ChainedShareReplay_06_multi_HTTP_Component implements OnInit {
  work1: State | undefined;
  work2: State | undefined;

  httpSubject = new Subject<State>();
  counterOfHttpData = 0;

  subsriptionsWork1: Subscription | undefined;
  subsriptionsWork2: Subscription | undefined;

  // apiData$ = this.findFirst().pipe(
  apiData$ = this.findNeverEnding().pipe(
    tap(() => console.log('Data Fetched')),
    shareReplay({bufferSize: 1, refCount: false}), // <= default <=>  shareReplay(1)
    // shareReplay({bufferSize: 1, refCount: true}), // (line-MARKER-1)
    refCountLogger(c => console.log('apiData$ after shareReplay subscribers=', c)),
    finalize(() => { console.log('Finalize apiData$ after shareReplay'); })
  );


  work$ = this.apiData$.pipe(
    tap(() => console.log('Building Controls')),
    map(s => ({...s, name: 'BUILDING'})),
    refCountLogger(c => console.log('work$ before shareReplay subscribers=', c)),
    shareReplay(1), // here we cache the BUILDING computation
    // shareReplay({bufferSize: 1, refCount: true}), // (line-MARKER-2) // here the BUILDING computation is NOT cached
    refCountLogger(c => console.log('work$ after shareReplay subscribers=', c)),
    finalize(() => { console.log('Finalize Work$'); })
  );

  ngOnInit(): void {
    console.log('INIT');
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
      tap(v => { console.log('Pseudo HTTP', v); }),
      finalize(() => { console.log('Finalize HTTP'); })
    );
  }

}
