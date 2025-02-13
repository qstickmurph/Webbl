import { Routes } from '@angular/router';

import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'game', component: GameComponent},
  {path: 'profile', component: ProfileComponent}
];
