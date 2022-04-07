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
            <li><a routerLink="chained-shareReplay-01">Chained sharedReplay</a></li>
            <li><a routerLink="chained-shareReplay-01-flexible-one-event-HTTP">Chained sharedReplay Flexible HTTP</a>
            </li>
            <li><a routerLink="chained-shareReplay-02-flexible-no-ending-HTTP">Chained sharedReplay Flexible HTTP
              multi</a></li>
            <li><a routerLink="chained-shareReplay-03-flexible-full">Chained sharedReplay Flexible FULL</a></li>
          </ul>
        </li>
      </ul>
    </div>

  `
})
export class HomeComponent {
}
