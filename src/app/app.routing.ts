import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
import {StateFilterLocalComponent} from './typeahead/00-remote-data-local-filtering/state-filter-local.component';
import {
  StateFilterLocalResolverComponent
} from './typeahead/01-remote-data-with-resolver-local-filtering/state-filter-local-resolver.component';
import {StatesResolver} from './typeahead/01-remote-data-with-resolver-local-filtering/states.resolver';
import {
  StateFilterLocalResolverCachedComponent
} from './typeahead/02-caching-states/state-filter-local-resolver-cached.component';
import {StatesCachedResolver} from './typeahead/02-caching-states/states-cached.resolver';

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
  // shareReplay-chained
  {path: 'shareReplay-chained-01', component: ChainedShareReplay_01_Component},
  {
    path: 'shareReplay-chained-01-flexible-one-event-HTTP',
    component: ChainedShareReplay_02_Flexible_one_event_HTTP_Component
  },
  {
    path: 'shareReplay-chained-02-flexible-no-ending-HTTP',
    component: ChainedShareReplay_03_Flexible_multi_HTTP_Component
  },
  {path: 'shareReplay-chained-03-flexible-full', component: ChainedShareReplay_04_Flexible_Full_Component},
  // UI
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
