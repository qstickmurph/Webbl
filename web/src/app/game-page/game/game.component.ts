import { AvailableMovesService } from './services/available-moves.service';
import { Component, inject } from '@angular/core';
import { PitchComponent } from '../../shared/pitch/pitch.component';
import { ScoreboardComponent } from '../../shared/scoreboard/scoreboard.component';
import { ChatLogComponent } from '../../shared/chat-log/chat-log.component';
import { ActionLogComponent } from '../../shared/action-log/action-log.component';
import { PitchPosition } from '../../models/pitch-position.model';
import { Player } from '../../models/player.model';
import { DEFAULT_PITCH_PLAYERS } from '../../constants/pitch-constants';
import { MovePathService } from './services/move-path.service';
import { PlayerPosition } from '../../models/player-position.model';
import { MovementPosition } from '../../models/movement-position.model';

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
  private movePathService = inject(MovePathService);

  public players: PlayerPosition[] = []
  public selectedPlayer?: PlayerPosition;
  public availableMoves: MovementPosition[] = [];
  public displayedMoves: PitchPosition[] = [];

  constructor() {
    this.players = DEFAULT_PITCH_PLAYERS;
  }

  onClickedOnPlayer(player: Player) {
    const selectedPlayerPosition = this.players.find(playerPosition => player.id === playerPosition.player.id);
    if (!selectedPlayerPosition) {
      return;
    }

    this.selectedPlayer = selectedPlayerPosition;
    this.availableMoves = this.availableMovesService.GetAvailableMoves(this.selectedPlayer.position, this.players.map(x => x.position));
    this.displayedMoves = [];
  }

  onClickAvailableMove(position: PitchPosition) {
    if (!this.selectedPlayer) {
      return;
    }

    this.displayedMoves = this.movePathService.GetBestPath(this.selectedPlayer.position, position, this.players.map(x => x.position));
  }

  onDblClickAvailableMove(position: PitchPosition) {
    if (!this.selectedPlayer) {
      return;
    }

    this.selectedPlayer.position = {
      row: position.row,
      col: position.col
    };

    this.deselectPlayer();
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault();
    this.deselectPlayer();
  }

  private deselectPlayer() {
    this.selectedPlayer = undefined;
    this.availableMoves = [];
    this.displayedMoves = [];
  }
}
