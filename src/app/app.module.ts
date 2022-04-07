import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {ChainedShareReplayFlexibleComponent} from './chained-shareReplay/chained-share-replay-flexible.component';
import {ChainedShareReplayComponent} from './chained-shareReplay/chained-share-replay.component';
import {HomeComponent} from './home.component';
import {OngoingHttpInterceptor} from './spinner-http/interceptor/ongoing-http.interceptor';
import {SpinnerComponent} from './spinner-http/ui/spinner.component';
import {StateFilterLocalComponent} from './typeahead/00-remote-data-local-filtering/state-filter-local.component';
import {
  StateFilterLocalResolverComponent
} from './typeahead/01-remote-data-with-resolver-local-filtering/state-filter-local-resolver.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    //
    StateFilterLocalComponent,
    StateFilterLocalResolverComponent,
    // Spinner
    SpinnerComponent,
    // chained shareReplay
    ChainedShareReplayComponent,
    ChainedShareReplayFlexibleComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    RouterModule, routing, BrowserAnimationsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: OngoingHttpInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
