import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {HomeComponent} from './home.component';
import {ChainedShareReplay_01_Component} from './shareReplay-chained/01-chained-share-replay.component';
import {OneShareReplayComponent_02} from './shareReplay-chained/02-one-shareReplay.component';
import {
  ChainedShareReplay_03_Flexible_multi_HTTP_Component
} from './shareReplay-chained/03-chained-share-replay-flexible-multi-HTTP.component';
import {
  ChainedShareReplay_02_Flexible_one_event_HTTP_Component
} from './shareReplay-chained/04-chained-share-replay-flexible-one-event-HTTP.component';
import {
  ChainedShareReplay_04_Flexible_Full_Component
} from './shareReplay-chained/05-chained-share-replay-flexible-full.component';
import {OngoingHttpInterceptor} from './spinner-http/interceptor/ongoing-http.interceptor';
import {SpinnerComponent} from './spinner-http/ui/spinner.component';
import {StateFilterLocalComponent} from './typeahead/00-remote-data-local-filtering/state-filter-local.component';
import {
  StateFilterLocalResolverComponent
} from './typeahead/01-remote-data-with-resolver-local-filtering/state-filter-local-resolver.component';
import {
  StateFilter11LocalResolverCachedComponent
} from './typeahead/02-caching-states/21-simple-shareReplay/state-filter-11-local-resolver-cached.component';
import {
  StateFilter22LocalResolverCachedComponent
} from './typeahead/02-caching-states/22-behaviorSubject-problem-make-it-work/state-filter-22-local-resolver-cached.component';
import {
  StateFilter33LocalResolverCachedComponent
} from './typeahead/02-caching-states/33-behaviorSubject-solution/state-filter-33-local-resolver-cached.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    //
    StateFilterLocalComponent,
    StateFilterLocalResolverComponent,
    StateFilter11LocalResolverCachedComponent,
    StateFilter22LocalResolverCachedComponent,
    StateFilter33LocalResolverCachedComponent,
    // Spinner
    SpinnerComponent,
    // chained shareReplay
    ChainedShareReplay_01_Component,
    OneShareReplayComponent_02,
    ChainedShareReplay_02_Flexible_one_event_HTTP_Component,
    ChainedShareReplay_03_Flexible_multi_HTTP_Component,
    ChainedShareReplay_04_Flexible_Full_Component,

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
