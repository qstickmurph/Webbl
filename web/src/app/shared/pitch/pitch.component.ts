import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PlayerIconComponent } from '../player-icon/player-icon.component'
import { Player } from '../../models/player.model';
import { PitchPosition } from '../../models/pitch-position.model';
import { MoveType } from '../../enums/move-type.enum';
import { MovementPosition } from '../../models/movement-position.model';
import { PlayerPosition } from '../../models/player-position.model';
import { PITCH_COLS, PITCH_ROWS } from '../../constants/pitch-dimensions.constants';

type PitchSquare = {
  position: PitchPosition;
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

  @Output() public clickOnPlayer = new EventEmitter<PlayerPosition>();
  @Output() public clickOnAvailableMove = new EventEmitter<PitchPosition>();
  @Output() public dblClickOnAvailableMove = new EventEmitter<PitchPosition>();

  public moveType = MoveType;
  public pitchSquares: PitchSquare[] = [];

  onClickOnPitchSquare(pitchSquare: PitchSquare) {
    const playerPositionClickedOn = pitchSquare.position.FindIn(this.players);
    const availableMoveClickedOn = pitchSquare.position.FindIn(this.availableMoves);

    if (playerPositionClickedOn) {
      this.clickOnPlayer.emit(playerPositionClickedOn);
    } else if (availableMoveClickedOn) {
      this.clickOnAvailableMove.emit(availableMoveClickedOn);
    }
  }

  onDblClickOnPitchSquare(pitchSquare: PitchSquare) {
    if (pitchSquare.availableMove) {
      this.dblClickOnAvailableMove.emit(pitchSquare.position);
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
        square.position.row === move.row
        && square.position.col === move.col
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
        square.position.row === move.row
        && square.position.col === move.col
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
          position: new PitchPosition(
            row,
            col
          ),
          availableMove: false,
          rush: false,
          highlighted: false,
          displayedMove: false
        };

        this.pitchSquares.push(newPitchSquare);
      }
    }
  }
}
