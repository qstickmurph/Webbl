import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PlayerIconComponent } from '../player-icon/player-icon.component'
import { Player } from '../../models/player.model';
import { MovementPosition, PitchPosition, PlayerPosition } from '../../models/pitch-position.model';
import { MoveType } from '../../enums/move-type.enum';
import { PITCH_COLS, PITCH_ROWS } from '../../constants/pitch-constants';

interface PitchSquare extends PitchPosition {
  row: number,
  col: number,
  availableMove: boolean,
  rush: boolean
}

@Component({
  selector: 'app-pitch',
  imports: [
    PlayerIconComponent
  ],
  templateUrl: './pitch.component.html',
  styleUrl: './pitch.component.scss'
})
export class PitchComponent implements OnInit, OnChanges {
  @Input() public players: PlayerPosition[] = [];
  @Input() public selectedPlayer?: Player;
  @Input() public availableMoves: MovementPosition[] = [];

  @Output() public clickedOnPlayer = new EventEmitter<Player>();
  @Output() public dblClickOnAvailableMove = new EventEmitter<PitchPosition>();

  public moveType = MoveType;
  public pitchSquares: PitchSquare[] = [];

  onClickedOnPlayer(player: Player) {
    this.clickedOnPlayer.emit(player);
  }

  onDblClickOnAvailableMove(availableMove: PitchPosition) {
    this.dblClickOnAvailableMove.emit(availableMove);
  }

  ngOnInit() {
    this.setupPitchSquares();
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['availableMoves']) {
        this.setupAvailableMoves(changes['availableMoves'].currentValue);
      }
  }

  private setupAvailableMoves(availableMoves: MovementPosition[]) {
    this.resetAvailableMoves();

    availableMoves.forEach(move => {
      const square = this.pitchSquares.find(square =>
                                            square.row === move.row
                                            && square.col === move.col);

      if (square) {
        square.availableMove = true;
        square.rush = move.moveType === MoveType.rush;
      }
    });
  }

  private resetAvailableMoves() {
    this.pitchSquares.forEach(square => {
        square.availableMove = false
        square.rush = false
    });
  }

  private setupPitchSquares() {
    this.pitchSquares = [];
    for (let row: number = 0; row < PITCH_ROWS; row++) {
      for (let col: number = 0; col < PITCH_COLS; col++) {
        const newPitchSquare: PitchSquare = {
          row: row,
          col: col,
          availableMove: false,
          rush: false
        };

        this.pitchSquares.push(newPitchSquare);
      }
    }
  }
}
