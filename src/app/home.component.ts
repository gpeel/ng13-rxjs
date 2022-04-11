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
            <li><a routerLink="state-local-filtering-cached-resolver">Remote State CACHED and by Resolver but Local
              filtering</a></li>
          </ul>
        </li>
        <li>
          <h4>Caching:</h4>
          <ul>
            <li><a routerLink="shareReplay-chained-01">Chained sharedReplay exposing the problem</a></li>
            <li><a routerLink="one-shareReplay-02">One sharedReplay</a></li>
            <li><a routerLink="shareReplay-chained-03-one-event-HTTP">Chained sharedReplay one Event HTTP</a>
            </li>
            <li><a routerLink="shareReplay-chained-04-no-ending-HTTP">Chained sharedReplay multi event HTTP
              multi</a></li>
            <li><a routerLink="shareReplay-chained-05-full">Chained sharedReplay FULL chain 3 levels</a></li>
          </ul>
        </li>
      </ul>
    </div>

  `
})
export class HomeComponent {
}
