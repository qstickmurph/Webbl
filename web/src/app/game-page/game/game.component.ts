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
import { GameOddsService } from './services/game-odds.service';
import { OddsPosition } from '../../models/odds-position.model';

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
  private gameOddsService = inject(GameOddsService);
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

    this.addBestPathToDisplayedMoves(position);
    this.calculateOddsFromDisplayedMoves();
    this.setAvailableMovesFromSelectedPosition();
  }

  private addBestPathToDisplayedMoves(position: PitchPosition) {
    const startPosition = this.pitchState.displayedMoves.length > 0 ? this.pitchState.displayedMoves.at(-1)! : this.pitchState.selectedPlayerPosition!;
    const selectedPlayer = this.pitchState.selectedPlayerPosition!.player;
    const currentDistance = this.pitchState.displayedMoves.length;
    const players = this.pitchState.players;
    const tackleZones = this.pitchState.tackleZones;
    const newPathMoves = this.movePathService.GetBestPath(
      startPosition,
      position,
      selectedPlayer,
      currentDistance,
      players,
      tackleZones
    );

    this.pitchState.displayedMoves = [
      ...this.pitchState.displayedMoves,
      ...newPathMoves
    ];
  }

  private calculateOddsFromDisplayedMoves() {
    const displayedMovesWithStart: PitchPosition[] = [
      this.pitchState.selectedPlayerPosition!,
      ...this.pitchState.displayedMoves
    ];
    const displayedOdds: OddsPosition[] = [];

    for(let i: number = 0; i < displayedMovesWithStart.length - 1; i++) {
      const startPosition = displayedMovesWithStart[i];
      const endPosition = displayedMovesWithStart[i+ 1];
      const selectedPlayer = this.pitchState.selectedPlayerPosition!.player;
      const tackleZones = this.pitchState.tackleZones;

      const dodgeChance = this.gameOddsService.GetDodgeChange(
        startPosition,
        endPosition,
        selectedPlayer,
        tackleZones
      );
      if (dodgeChance < 1) {
        const dodgeOddsPosition = OddsPosition.FromPosition(endPosition, dodgeChance);
        displayedOdds.push(dodgeOddsPosition);
      }

      if (i < selectedPlayer.ma) {
        continue;
      }

      const rushChance = this.gameOddsService.GetRushChance();
      if (rushChance < 1) {
        const rushOddsPosition = OddsPosition.FromPosition(endPosition, rushChance);
        displayedOdds.push(rushOddsPosition);
      }
    }

    this.pitchState.displayedOdds = displayedOdds;
  }

  private setAvailableMovesFromSelectedPosition() {
    const remainingMovement = this.pitchState.selectedPlayerPosition!.player.ma - this.pitchState.displayedMoves.length;
    const lastMovePosition = this.pitchState.displayedMoves.at(-1) ?? this.pitchState.selectedPlayerPosition!;
    this.pitchState.availableMoves = this.availableMovesService.GetAvailableMoves(lastMovePosition, this.pitchState.players, remainingMovement);
  }

  onDblClickAvailableMove(position: PitchPosition) {
    if (!this.pitchState.selectedPlayerPosition) {
      return;
    }

    if(!this.pitchState.displayedMoves.at(-1)?.IsEqual(position)) {
      this.onClickAvailableMove(position);
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
    this.pitchState.displayedOdds = [];
    this.pitchState.tackleZones = [];
  }
}
