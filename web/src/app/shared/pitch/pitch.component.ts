import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayerIconComponent } from '../player-icon/player-icon.component'
import { Player } from '../../models/player.model';
import { MovementPosition, PitchPosition, PlayerPosition } from '../../models/pitch-position.model';
import { MoveType } from '../../enums/move-type.enum';
import { PITCH_COLS, PITCH_ROWS } from '../../constants/pitch-constants';

@Component({
  selector: 'app-pitch',
  imports: [
    PlayerIconComponent
  ],
  templateUrl: './pitch.component.html',
  styleUrl: './pitch.component.scss'
})
export class PitchComponent implements OnInit{
  @Input() public players: PlayerPosition[] = [];
  @Input() public selectedPlayer?: Player;
  @Input() public availableMoves: MovementPosition[] = [];

  @Output() public clickedOnPlayer = new EventEmitter<Player>();
  @Output() public dblClickOnAvailableMove = new EventEmitter<MovementPosition>();

  public moveType = MoveType;
  public pitchSquares: PitchPosition[] = [];

  onClickedOnPlayer(player: Player) {
    this.clickedOnPlayer.emit(player);
  }

  onDblClickOnAvailableMove(availableMove: MovementPosition) {
    this.dblClickOnAvailableMove.emit(availableMove);
  }

  ngOnInit() {
    this.setupPitchSquares();
  }

  private setupPitchSquares() {
    this.pitchSquares = [];
    for (let row: number = 0; row < PITCH_ROWS; row++) {
      for (let col: number = 0; col < PITCH_COLS; col++) {
        const newPitchSquare: PitchPosition = {
          row: row,
          col: col
        };

        this.pitchSquares.push(newPitchSquare);
      }
    }
  }
}
