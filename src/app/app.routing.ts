import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
  // UI
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
