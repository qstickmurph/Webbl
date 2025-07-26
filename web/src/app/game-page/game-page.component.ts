import { Component } from '@angular/core';
import { PitchComponent } from '../shared/pitch/pitch.component';
import { ScoreboardComponent } from '../shared/scoreboard/scoreboard.component';
import { ChatLogComponent } from '../shared/chat-log/chat-log.component';
import { ActionLogComponent } from '../shared/action-log/action-log.component';

@Component({
  selector: 'app-game-page',
  imports: [
    PitchComponent,
    ScoreboardComponent,
    ChatLogComponent,
    ActionLogComponent
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss'
})
export class GamePageComponent {

}
