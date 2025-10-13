import { PITCH_COLS, PITCH_ROWS } from "../constants/pitch-dimensions.constants";
import { MoveType } from "../models/move-type.enum";
import { MovementPosition } from "./movement-position.model";
import { OddsPosition } from "./odds-position.model";
import { PitchDisplaySquare } from "./pitch-display-square.model";
import { PitchPosition } from "./pitch-position.model";
import { PlayerPosition } from "./player-position.model";
import { TackleZonePosition } from "./tackle-zone-position.model";

const playerAnimationSpeed = 250;

export class PitchDisplayState {
  private _players: PlayerPosition[] = [];
  private _selectedPlayerPosition?: PlayerPosition;
  private _availableMoves: MovementPosition[] = [];
  private _displayedMoves: PitchPosition[] = [];
  private _displayedOdds: OddsPosition[] = [];
  private _tackleZones: TackleZonePosition[] = [];

  public pitchDisplaySquares: PitchDisplaySquare[] = [];
  public animating: boolean = false;

  constructor() {
    this.initializePitchDisplaySquares();
  }

  public get players() {
    return this._players;
  }

  public set players(players: PlayerPosition[]) {
    this._players = players;
    this.setupPitchDisplaySquarePlayers();
  }

  public get selectedPlayerPosition() {
    return this._selectedPlayerPosition;
  }

  public set selectedPlayerPosition(selectedPlayerPosition: PlayerPosition | undefined) {
    this._selectedPlayerPosition = selectedPlayerPosition;
    this.setupPitchDisplaySquareSelectedPlayer();
  }

  public get availableMoves(){
    return this._availableMoves;
  }

  public set availableMoves(availableMoves: MovementPosition[]) {
    this._availableMoves = availableMoves;
    this.setupPitchDisplaySquareAvailableMoves();
  }

  public get displayedMoves() {
    return this._displayedMoves;
  }

  public set displayedMoves(displayedMoves: PitchPosition[]) {
    this._displayedMoves = displayedMoves;
    this.setupPitchDisplaySquareDisplayedMoves();
  }

  public get displayedOdds() {
    return this._displayedOdds;
  }

  public set displayedOdds(displayedOdds: OddsPosition[]) {
    this._displayedOdds = displayedOdds;
    this.setupPitchDisplaySquareDisplayedOdds();
  }

  public get tackleZones() {
    return this._tackleZones;
  }

  public set tackleZones(tackleZones: TackleZonePosition[]) {
    this._tackleZones = tackleZones;
    this.setupPitchDisplaySquareTackleZones();
  }

  public MovePlayerAlongPath(player: PlayerPosition, path: PitchPosition[], index: number = 0) {
    this.animating = true;
    if(index === path.length) {
      this.animating = false;
      return;
    }

    setTimeout(() => this.MovePlayerAlongPath(player, path, index+1), playerAnimationSpeed);

    this.MovePlayerNextSquare(player, path[index]);
  }

  private MovePlayerNextSquare(player: PlayerPosition, position: PitchPosition) {
    const originPitchDisplaySquare = player.FindIn(this.pitchDisplaySquares);
    originPitchDisplaySquare!.player = undefined;
    player.MoveTo(position);
    const destPitchDisplaySquare = position.FindIn(this.pitchDisplaySquares);
    destPitchDisplaySquare!.player = player.player;
  }

  private initializePitchDisplaySquares() {
    this.pitchDisplaySquares = [];
    for (let row: number = 0; row < PITCH_ROWS; row++) {
      for (let col: number = 0; col < PITCH_COLS; col++) {
        this.pitchDisplaySquares.push(new PitchDisplaySquare(row, col));
      }
    }
  }

  private setupPitchDisplaySquarePlayers() {
    this.resetPitchDisplaySquarePlayers();

    this._players.forEach(playerPosition => {
      const square = playerPosition.FindIn(this.pitchDisplaySquares)

      if (square) {
        square.player = playerPosition.player;
      }
    });
  }

  private resetPitchDisplaySquarePlayers() {
    this.pitchDisplaySquares.forEach(square => {
        square.player = undefined;
    });
  }

  private setupPitchDisplaySquareSelectedPlayer() {
    this.resetPitchDisplaySquareSelectedPlayer();
    if (!this._selectedPlayerPosition) {
      return;
    }

    const square = this._selectedPlayerPosition.FindIn(this.pitchDisplaySquares);

    if (square) {
      square.isSelectedPlayer = true;
    }
  }

  private resetPitchDisplaySquareSelectedPlayer() {
    this.pitchDisplaySquares.forEach(square => {
        square.isSelectedPlayer = false;
    });
  }

  private setupPitchDisplaySquareAvailableMoves() {
    this.resetPitchDisplaySquareAvailableMoves();

    this._availableMoves.forEach(move => {
      const square = move.FindIn(this.pitchDisplaySquares)

      if (square) {
        square.isAvailableMove = true;
        square.isRush = move.moveType === MoveType.rush;
      }
    });
  }

  private resetPitchDisplaySquareAvailableMoves() {
    this.pitchDisplaySquares.forEach(square => {
        square.isAvailableMove = false;
        square.isRush = false;
    });
  }

  private setupPitchDisplaySquareDisplayedMoves() {
    this.resetPitchDisplaySquareDisplayedMoves();

    this._displayedMoves.forEach((move, i) => {
      const square = move.FindIn(this.pitchDisplaySquares)

      if (square) {
        square.isDisplayedMove = true;
        square.moveNums.push(i+1);
      }
    });
  }

  private resetPitchDisplaySquareDisplayedMoves() {
    this.pitchDisplaySquares.forEach(square => {
        square.isDisplayedMove = false;
        square.moveNums = [];
    });
  }

  private setupPitchDisplaySquareDisplayedOdds() {
    this.resetPitchDisplaySquareDisplayedOdds();

    this._displayedOdds.forEach(odds => {
      const square = odds.FindIn(this.pitchDisplaySquares)

      if (square) {
        square.displayedOdds.push(odds.odds);
      }
    });
  }

  private resetPitchDisplaySquareDisplayedOdds() {
    this.pitchDisplaySquares.forEach(square => {
        square.displayedOdds = [];
    });
  }
  private setupPitchDisplaySquareTackleZones() {
    this.resetPitchDisplaySquareTackleZones();

    this._tackleZones.forEach(tackleZonePosition => {
      const square = tackleZonePosition.FindIn(this.pitchDisplaySquares)

      if (square) {
        square.tackleZones = tackleZonePosition.numTackleZones;
      }
    });
  }

  private resetPitchDisplaySquareTackleZones() {
    this.pitchDisplaySquares.forEach(square => {
        square.tackleZones = 0;
    });
  }
}
