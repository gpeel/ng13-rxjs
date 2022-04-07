import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChainedShareReplay_01_Component} from './chained-shareReplay/01-chained-share-replay.component';
import {
  ChainedShareReplay_02_Flexible_one_event_HTTP_Component
} from './chained-shareReplay/02-chained-share-replay-flexible-one-event-HTTP.component';
import {
  ChainedShareReplay_03_Flexible_multi_HTTP_Component
} from './chained-shareReplay/03-chained-share-replay-flexible-multi-HTTP.component';
import {
  ChainedShareReplay_04_Flexible_Full_Component
} from './chained-shareReplay/04-chained-share-replay-flexible-full.component';
import {HomeComponent} from './home.component';
import {StateFilterLocalComponent} from './typeahead/00-remote-data-local-filtering/state-filter-local.component';
import {
  StateFilterLocalResolverComponent
} from './typeahead/01-remote-data-with-resolver-local-filtering/state-filter-local-resolver.component';
import {StatesResolver} from './typeahead/01-remote-data-with-resolver-local-filtering/states.resolver';
import {
  StateFilterLocalResolverCachedComponent
} from './typeahead/03-caching-states/state-filter-local-resolver-cached.component';
import {StatesCachedResolver} from './typeahead/03-caching-states/states-cached.resolver';

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
  {
    path: 'state-local-filtering-cached-resolver',
    component: StateFilterLocalResolverCachedComponent,
    resolve: {
      states: StatesCachedResolver
    }
  },
  // chained-shareReplay
  {path: 'chained-shareReplay-01', component: ChainedShareReplay_01_Component},
  {
    path: 'chained-shareReplay-01-flexible-one-event-HTTP',
    component: ChainedShareReplay_02_Flexible_one_event_HTTP_Component
  },
  {
    path: 'chained-shareReplay-02-flexible-no-ending-HTTP',
    component: ChainedShareReplay_03_Flexible_multi_HTTP_Component
  },
  {path: 'chained-shareReplay-03-flexible-full', component: ChainedShareReplay_04_Flexible_Full_Component},
  // UI
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
