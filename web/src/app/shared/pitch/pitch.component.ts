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
  rush: boolean,
  displayedMove: boolean,
  highlighted: boolean
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
  @Input() public displayedMoves: PitchPosition[] = [];

  @Output() public clickOnPlayer = new EventEmitter<Player>();
  @Output() public clickOnAvailableMove = new EventEmitter<PitchPosition>();
  @Output() public dblClickOnAvailableMove = new EventEmitter<PitchPosition>();

  public moveType = MoveType;
  public pitchSquares: PitchSquare[] = [];

  onClickOnPitchSquare(pitchSquare: PitchSquare) {
    const playerClickedOn = this.FindPitchPlayer(pitchSquare)?.player;
    const availableMoveClickedOn = this.FindAvailableMovePosition(pitchSquare);

    if (playerClickedOn) {
      this.clickOnPlayer.emit(playerClickedOn);
    } else if (availableMoveClickedOn) {
      this.clickOnAvailableMove.emit(availableMoveClickedOn);
    }
  }

  onDblClickOnPitchSquare(pitchSquare: PitchSquare) {
    if (pitchSquare.availableMove) {
      this.dblClickOnAvailableMove.emit(pitchSquare);
    }
  }

  onMouseEnterPitchSquare(pitchSquare: PitchSquare) {
    pitchSquare.highlighted = true;
  }

  onMouseLeavePitchSquare(pitchSquare: PitchSquare) {
    pitchSquare.highlighted = false;
  }

  ngOnInit() {
    this.setupPitchSquares();
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['availableMoves']) {
        this.setupPitchSquareAvailableMoves(changes['availableMoves'].currentValue);
      }

      if(changes['displayedMoves']) {
        this.setupPitchSquareDisplayedMoves(changes['displayedMoves'].currentValue);
      }
  }

  private setupPitchSquareAvailableMoves(availableMoves: MovementPosition[]) {
    this.resetAvailableMoves();

    availableMoves.forEach(move => {
      const square = this.pitchSquares.find(square =>
        square.row === move.row
        && square.col === move.col
      );

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

  private setupPitchSquareDisplayedMoves(displayedMoves: PitchPosition[]) {
    this.resetDisplayedMoves();

    displayedMoves.forEach(move => {
      const square = this.pitchSquares.find(square =>
        square.row === move.row
        && square.col === move.col
      );

      if (square) {
        square.displayedMove = true;
      }
    });
  }

  private resetDisplayedMoves() {
    this.pitchSquares.forEach(square => {
        square.displayedMove = false
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
          rush: false,
          highlighted: false,
          displayedMove: false
        };

        this.pitchSquares.push(newPitchSquare);
      }
    }
  }

  private FindPitchPlayer(position: PitchPosition) {
    const clickedOnPlayerPosition = this.players.find(player =>
      player.row === position.row
      && player.col === position.col
     );

     return clickedOnPlayerPosition;
  }

  private FindAvailableMovePosition(position: PitchPosition) {
    const clickedOnPlayerPosition = this.availableMoves.find(pitchPosition =>
      pitchPosition.row === position.row
      && pitchPosition.col === position.col
     );

     return clickedOnPlayerPosition;
  }
}
