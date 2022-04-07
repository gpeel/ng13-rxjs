import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  ChainedShareReplayFlexibleEndingHTTPComponent
} from './chained-shareReplay/chained-share-replay-flexible-ending-HTTP.component';
import {
  ChainedShareReplayFlexibleFullComponent
} from './chained-shareReplay/chained-share-replay-flexible-full.component';
import {ChainedShareReplayFlexibleComponent} from './chained-shareReplay/chained-share-replay-flexible.component';
import {ChainedShareReplayComponent} from './chained-shareReplay/chained-share-replay.component';
import {HomeComponent} from './home.component';
import {StateFilterLocalComponent} from './typeahead/00-remote-data-local-filtering/state-filter-local.component';
import {
  StateFilterLocalResolverComponent
} from './typeahead/01-remote-data-with-resolver-local-filtering/state-filter-local-resolver.component';
import {StatesResolver} from './typeahead/01-remote-data-with-resolver-local-filtering/states.resolver';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  // Typeahead
  {path: 'state-local-filtering', component: StateFilterLocalComponent},
  {
    path: 'state-local-filtering-resolver',
    component: StateFilterLocalResolverComponent,
    resolve: {
      states: StatesResolver
    }
  },
  // chained-shareReplay
  {path: 'chained-shareReplay', component: ChainedShareReplayComponent},
  {path: 'chained-shareReplay-flexible', component: ChainedShareReplayFlexibleEndingHTTPComponent},
  {path: 'chained-shareReplay-flexible-never-ending', component: ChainedShareReplayFlexibleComponent},
  {path: 'chained-shareReplay-flexible-never-ending-full', component: ChainedShareReplayFlexibleFullComponent},
  // UI
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
