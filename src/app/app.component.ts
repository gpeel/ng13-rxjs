import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {Component, Inject, OnInit} from '@angular/core';
import {OngoingHttpState} from './spinner-http/behavior-subject/ongoing-http-state.service';

@Component({
  selector: 'app-root',
  template: `
    <button type="button" class="btn btn-primary" routerLink=""> Back Home</button>
    <h2 class="d-inline m-3">'RxJs codes for Angular'</h2>
    <spinner></spinner>
    <div class="m-4">
      <router-outlet></router-outlet>
    </div>

  `,
})
export class AppComponent implements OnInit {
  show: boolean = false;

  constructor(private ongoingHttpRequestState: OngoingHttpState,
              @Inject(HTTP_INTERCEPTORS) listInterceptor: any
  ) {
    console.log('HTTP_INTERCEPTORS', listInterceptor);
  }

  ngOnInit(): void {
    this.ongoingHttpRequestState.getData$()
      .subscribe(b => setTimeout(() => this.show = b, 0));
  }

}
