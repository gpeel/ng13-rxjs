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
import {
  ChainedShareReplay_02_Flexible_one_event_HTTP_Component
} from './shareReplay-chained/02-chained-share-replay-flexible-one-event-HTTP.component';
import {
  ChainedShareReplay_03_Flexible_multi_HTTP_Component
} from './shareReplay-chained/03-chained-share-replay-flexible-multi-HTTP.component';
import {
  ChainedShareReplay_04_Flexible_Full_Component
} from './shareReplay-chained/04-chained-share-replay-flexible-full.component';
import {OngoingHttpInterceptor} from './spinner-http/interceptor/ongoing-http.interceptor';
import {SpinnerComponent} from './spinner-http/ui/spinner.component';
import {StateFilterLocalComponent} from './typeahead/00-remote-data-local-filtering/state-filter-local.component';
import {
  StateFilterLocalResolverComponent
} from './typeahead/01-remote-data-with-resolver-local-filtering/state-filter-local-resolver.component';
import {
  StateFilterLocalResolverCachedComponent
} from './typeahead/02-caching-states/state-filter-local-resolver-cached.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    //
    StateFilterLocalComponent,
    StateFilterLocalResolverComponent,
    StateFilterLocalResolverCachedComponent,
    // Spinner
    SpinnerComponent,
    // chained shareReplay
    ChainedShareReplay_01_Component,
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
