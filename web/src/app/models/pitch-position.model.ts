import { MoveType } from "../enums/move-type.enum";
import { Player } from "./player.model";

export interface PitchPosition {
  row: number;
  col: number;
}

export interface PlayerPosition extends PitchPosition {
  row: number;
  col: number;
  player: Player;
}

export interface MovementPosition extends PitchPosition {
  row: number;
  col: number;
  moveType: MoveType;
}
