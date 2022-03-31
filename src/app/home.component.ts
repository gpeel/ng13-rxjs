import {Component} from '@angular/core';

@Component({
  selector: 'app-menu',
  template: `
    <div>
      <ul class="mt-4">
        <li>
          <h4>Events:</h4>
          <ul>
            <li><a routerLink="simple-click">(click) Event</a></li>
            <!--            <li><a routerLink="simple-click">(click) Event</a></li>-->
          </ul>
        </li>
      </ul>
    </div>

  `
})
export class HomeComponent {
}
