import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {ChainedShareReplay_01_Component} from './shareReplay-chained/01-chained-shareReplay.component';
import {
  ChainedShareReplay_05_one_event_HTTP_Component
} from './shareReplay-chained/05-chained-share-replay-one-event-HTTP.component';
import {
  ChainedShareReplay_06_multi_HTTP_Component
} from './shareReplay-chained/06-chained-shareReplay-multi-HTTP.component';
import {ChainedShareReplay_07_Full_Component} from './shareReplay-chained/07-chained-shareReplay-full.component';
import {OneShareReplay_02_Component} from './shareReplay/02-one-shareReplay.component';
import {OneShareReplay_03_refCount_BAD_Component} from './shareReplay/03-one-shareReplay-refCount-first-BAD.component';
import {OneShareReplay_04_multi_HTTP_Component} from './shareReplay/04-one-shareReplay-multi-HTTP.component';
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
  {path: 'one-shareReplay-02', component: OneShareReplay_02_Component},
  {path: 'one-shareReplay-03-refcount', component: OneShareReplay_03_refCount_BAD_Component},
  {path: 'one-shareReplay-04-multi-HTTP', component: OneShareReplay_04_multi_HTTP_Component},
  {
    path: 'shareReplay-chained-05-one-HTTP',
    component: ChainedShareReplay_05_one_event_HTTP_Component
  },
  {
    path: 'shareReplay-chained-06-multi-HTTP',
    component: ChainedShareReplay_06_multi_HTTP_Component
  },
  {path: 'shareReplay-chained-07-full', component: ChainedShareReplay_07_Full_Component},
  // UI
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
