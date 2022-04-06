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
          </ul>
        </li>
        <li>
          <h4>Caching:</h4>
          <ul>
            <li><a routerLink="chained-shareReplay">Chained sharedReplay Problem</a></li>
          </ul>
        </li>
      </ul>
    </div>

  `
})
export class HomeComponent {
}
