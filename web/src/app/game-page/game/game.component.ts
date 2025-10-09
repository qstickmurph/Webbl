import { AvailableMovesService } from './services/available-moves.service';
import { Component, inject } from '@angular/core';
import { PitchComponent } from '../../shared/pitch/pitch.component';
import { ScoreboardComponent } from '../../shared/scoreboard/scoreboard.component';
import { ChatLogComponent } from '../../shared/chat-log/chat-log.component';
import { ActionLogComponent } from '../../shared/action-log/action-log.component';
import { PitchPosition } from '../../models/pitch-position.model';
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
  public selectedPlayerPosition?: PlayerPosition;
  public availableMoves: MovementPosition[] = [];
  public displayedMoves: PitchPosition[] = [];

  constructor() {
    this.players = DEFAULT_PITCH_PLAYERS;
  }

  onClickedOnPlayer(playerPosition: PlayerPosition) {
    this.selectedPlayerPosition = playerPosition;
    this.availableMoves = this.availableMovesService.GetAvailableMoves(this.selectedPlayerPosition, this.players,  this.selectedPlayerPosition.player.ma);
    this.displayedMoves = [];
  }

  onClickAvailableMove(position: PitchPosition) {
    if (!this.selectedPlayerPosition) {
      return;
    }

    const startPosition = this.displayedMoves.length > 0 ? this.displayedMoves.at(-1)! : this.selectedPlayerPosition;
    const newPathMoves = this.movePathService.GetBestPath(startPosition, position, this.players);
    this.displayedMoves = [
      ...this.displayedMoves,
      ...newPathMoves.slice(1)
    ];
    const remainingMovement = this.selectedPlayerPosition.player.ma - this.displayedMoves.length;
    this.availableMoves = this.availableMovesService.GetAvailableMoves(this.displayedMoves.at(-1)!, this.players, remainingMovement);
  }

  onDblClickAvailableMove(position: PitchPosition) {
    if (!this.selectedPlayerPosition) {
      return;
    }

    this.selectedPlayerPosition.MoveTo(position);
    this.deselectPlayer();
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault();
    this.deselectPlayer();
  }

  private deselectPlayer() {
    this.selectedPlayerPosition = undefined;
    this.availableMoves = [];
    this.displayedMoves = [];
  }
}
