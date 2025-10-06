import { Component } from '@angular/core';
import { GameComponent } from './game/game';

@Component({
  selector: 'app-game-page',
  imports: [
    GameComponent
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss'
})
export class GamePageComponent {

}
