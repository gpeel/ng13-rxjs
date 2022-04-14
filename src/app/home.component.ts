import {Component} from '@angular/core';

@Component({
  selector: 'app-menu',
  template: `
    <div>
      <ul class="mt-4">
        <li>
          <h4>Filter:</h4>
          <ul>
            <li><a routerLink="state-local-filtering">Remote State but Local filtering</a></li>
            <li><a routerLink="state-local-filtering-resolver">Remote State by Resolver but Local filtering</a></li>
            <li><a routerLink="state-local-11-filtering-cached-resolver">Remote State CACHED (shareReplay) and by
              Resolver but Local
              filtering</a></li>
            <li><a routerLink="state-local-22-filtering-cached-resolver">Remote State CACHED (BehaviorSubject) 22
              EXERCISE-TO-SOVLE
              filtering</a></li>
            <li><a routerLink="state-local-33-filtering-cached-resolver">Remote State CACHED (BehaviorSubject) 33
              SOLUTION</a></li>
          </ul>
        </li>
        <li class="mt-2">
          <h4>Caching with shareReplay</h4>
          <ul>
            <li><a routerLink="one-shareReplay-01">One sharedReplay</a></li>
            <li><a routerLink="one-shareReplay-02-not-same-obs">One sharedReplay with service HTTP ANTIPATTERN</a></li>
            <li><a routerLink="one-shareReplay-03-refcount">One sharedReplay BEWARE of refCount true with first() </a>
            </li>
            <li><a routerLink="one-shareReplay-04-multi-HTTP">One sharedReplay multi event</a></li>
          </ul>
        </li>
        <li class="mt-2">
          <h4>Caching with chained shareReplay</h4>
          <ul>
            <li><a routerLink="shareReplay-chained-01">Chained sharedReplay exposing the problem</a></li>
            <li><a routerLink="shareReplay-chained-03-one-HTTP">Chained sharedReplay one Event HTTP</a>
            </li>
            <li><a routerLink="shareReplay-chained-06-multi-HTTP">Chained sharedReplay multi event HTTP
              multi</a></li>
            <li><a routerLink="shareReplay-chained-07-full">Chained sharedReplay FULL chain 3 levels</a></li>
          </ul>
        </li>
      </ul>
    </div>

  `
})
export class HomeComponent {
}
