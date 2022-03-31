import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <button type="button" class="btn btn-primary" routerLink=""> Back Home</button>
    <h2 class="d-inline m-3">'RxJs codes for Angular'</h2>
    <div class="m-4">
      <router-outlet></router-outlet>
    </div>

  `,
})
export class AppComponent {

}
