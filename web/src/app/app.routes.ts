import { Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { PlayPageComponent } from './play-page/play-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GamePageComponent } from './game-page/game-page.component';

export const routes: Routes = [
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: HomePageComponent},
  {path: 'play', component: PlayPageComponent},
  {path: 'game', component: GamePageComponent},
  { path: '404', component: PageNotFoundComponent },
  { path: '**',   redirectTo: '404', pathMatch: 'full' }
];
