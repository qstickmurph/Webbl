import { Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { PlayPageComponent } from './play-page/play-page.component';

export const routes: Routes = [
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: HomePageComponent},
  {path: 'play', component: PlayPageComponent}
];
