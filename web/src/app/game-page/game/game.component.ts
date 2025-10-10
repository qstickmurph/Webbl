import { AvailableMovesService } from './services/available-moves.service';
import { Component, inject, OnInit } from '@angular/core';
import { PitchComponent } from '../../shared/pitch/pitch.component';
import { ScoreboardComponent } from '../../shared/scoreboard/scoreboard.component';
import { ChatLogComponent } from '../../shared/chat-log/chat-log.component';
import { ActionLogComponent } from '../../shared/action-log/action-log.component';
import { PitchPosition } from '../../models/pitch-position.model';
import { DEFAULT_PITCH_PLAYERS } from '../../constants/pitch-constants';
import { MovePathService } from './services/move-path.service';
import { PlayerPosition } from '../../models/player-position.model';
import { TackleZoneService } from './services/tackle-zone.service';
import { PitchDisplayState } from '../../models/pitch-display-state.model';

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
export class GameComponent implements OnInit {
  private availableMovesService = inject(AvailableMovesService);
  private movePathService = inject(MovePathService);
  private tackleZoneService = inject(TackleZoneService);

  public pitchState: PitchDisplayState = new PitchDisplayState();

  ngOnInit() {
    this.pitchState.players = DEFAULT_PITCH_PLAYERS;
  }

  onClickedOnPlayer(playerPosition: PlayerPosition) {
    this.pitchState.selectedPlayerPosition = playerPosition;
    this.pitchState.availableMoves = this.availableMovesService.GetAvailableMoves(
      this.pitchState.selectedPlayerPosition,
      this.pitchState.players,
      this.pitchState.selectedPlayerPosition.player.ma
    );
    this.pitchState.displayedMoves = [];
    this.pitchState.tackleZones = this.tackleZoneService.getTackleZones(this.pitchState.players, this.pitchState.selectedPlayerPosition.player.team);
  }

  onClickAvailableMove(position: PitchPosition) {
    if (!this.pitchState.selectedPlayerPosition) {
      return;
    }

    const startPosition = this.pitchState.displayedMoves.length > 0 ? this.pitchState.displayedMoves.at(-1)! : this.pitchState.selectedPlayerPosition;
    const newPathMoves = this.movePathService.GetBestPath(startPosition, position, this.pitchState.players);
    this.pitchState.displayedMoves = [
      ...this.pitchState.displayedMoves,
      ...newPathMoves
    ];
    const remainingMovement = this.pitchState.selectedPlayerPosition.player.ma - this.pitchState.displayedMoves.length;
    this.pitchState.availableMoves = this.availableMovesService.GetAvailableMoves(this.pitchState.displayedMoves.at(-1)!, this.pitchState.players, remainingMovement);
  }

  onDblClickAvailableMove(position: PitchPosition) {
    if (!this.pitchState.selectedPlayerPosition) {
      return;
    }

    this.pitchState.MovePlayerAlongPath(this.pitchState.selectedPlayerPosition, this.pitchState.displayedMoves);
    this.deselectPlayer();
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault();
    this.deselectPlayer();
  }

  private deselectPlayer() {
    this.pitchState.selectedPlayerPosition = undefined;
    this.pitchState.availableMoves = [];
    this.pitchState.displayedMoves = [];
    this.pitchState.tackleZones = [];
  }
}
