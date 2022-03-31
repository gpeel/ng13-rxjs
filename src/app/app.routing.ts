import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  // UI
  // {path: 'spinner', component: WrapperComponent},
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
