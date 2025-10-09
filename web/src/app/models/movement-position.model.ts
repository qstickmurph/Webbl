import { MoveType } from "../enums/move-type.enum";
import { PitchPosition } from "./pitch-position.model";

export type MovementPosition = {
  position: PitchPosition;
  moveType: MoveType;
}
