import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
import {StateFilterLocalComponent} from './typeahead/00-remote-data-local-filtering/state-filter-local.component';
import {
  StateFilterLocalResolverComponent
} from './typeahead/01-remote-data-with-resolver-local-filtering/state-filter-local-resolver.component';
import {StatesResolver} from './typeahead/01-remote-data-with-resolver-local-filtering/states.resolver';
import {
  StateFilter11LocalResolverCachedComponent
} from './typeahead/02-caching-states/21-simple-shareReplay/state-filter-11-local-resolver-cached.component';
import {
  StatesCachedShareReplayResolver
} from './typeahead/02-caching-states/21-simple-shareReplay/states-cached-shareReplay.resolver';
import {
  StateFilter22LocalResolverCachedComponent
} from './typeahead/02-caching-states/22-behaviorSubject-problem-make-it-work/state-filter-22-local-resolver-cached.component';
import {
  StatesCached22BehaviorSubjectResolver
} from './typeahead/02-caching-states/22-behaviorSubject-problem-make-it-work/states-cached-22-behaviorSubject.resolver';
import {
  StateFilter33LocalResolverCachedComponent
} from './typeahead/02-caching-states/33-behaviorSubject-solution/state-filter-33-local-resolver-cached.component';
import {
  StatesCached33BehaviorSubjectResolver
} from './typeahead/02-caching-states/33-behaviorSubject-solution/states-cached-33-behaviorSubject.resolver';

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
    path: 'state-local-11-filtering-cached-resolver',
    component: StateFilter11LocalResolverCachedComponent,
    resolve: {
      states: StatesCachedShareReplayResolver
    }
  },
  {
    path: 'state-local-22-filtering-cached-resolver',
    component: StateFilter22LocalResolverCachedComponent,
    resolve: {
      states: StatesCached22BehaviorSubjectResolver
    }
  },
  {
    path: 'state-local-33-filtering-cached-resolver',
    component: StateFilter33LocalResolverCachedComponent,
    resolve: {
      states: StatesCached33BehaviorSubjectResolver
    }
  },
  // shareReplay-chained
  {path: 'shareReplay-chained-01', component: ChainedShareReplay_01_Component},
  {path: 'one-shareReplay-02', component: OneShareReplayComponent_02},
  {
    path: 'shareReplay-chained-03-one-event-HTTP',
    component: ChainedShareReplay_02_Flexible_one_event_HTTP_Component
  },
  {
    path: 'shareReplay-chained-04-no-ending-HTTP',
    component: ChainedShareReplay_03_Flexible_multi_HTTP_Component
  },
  {path: 'shareReplay-chained-05-full', component: ChainedShareReplay_04_Flexible_Full_Component},
  // UI
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
