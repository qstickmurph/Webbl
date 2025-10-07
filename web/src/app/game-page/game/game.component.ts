import { AvailableMovesService } from './services/available-moves.service';
import { Component, inject } from '@angular/core';
import { PitchComponent } from '../../shared/pitch/pitch.component';
import { ScoreboardComponent } from '../../shared/scoreboard/scoreboard.component';
import { ChatLogComponent } from '../../shared/chat-log/chat-log.component';
import { ActionLogComponent } from '../../shared/action-log/action-log.component';
import { MoveType } from '../../enums/move-type.enum';
import { PitchPosition } from '../../models/pitch-position.model';
import { Player } from '../../models/player.model';
import { DEFAULT_PITCH_PLAYERS } from '../../constants/pitch-constants';

@Component({
  selector: 'app-game',
  imports: [
    PitchComponent,
    ScoreboardComponent,
    ChatLogComponent,
    ActionLogComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  private availableMovesService = inject(AvailableMovesService);

  public players: PitchPosition<Player>[] = []
  public selectedPlayer?: Player;
  public availableMoves: PitchPosition<MoveType>[] = [];

  constructor() {
    this.players = DEFAULT_PITCH_PLAYERS;
  }

  onClickedOnPlayer(player: Player) {
    this.selectedPlayer = player;

    const selectedPlayerPosition = this.players.find(playerPosition => player.id === playerPosition.data.id);
    if (!selectedPlayerPosition) {
      return;
    }

    this.availableMoves = this.availableMovesService.GetAvailableMoves(selectedPlayerPosition.row, selectedPlayerPosition.col)
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault();
    this.selectedPlayer = undefined;
  }
}
