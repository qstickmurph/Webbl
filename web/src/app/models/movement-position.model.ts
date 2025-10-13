import { MoveType } from "../models/move-type.enum";
import { PitchPosition } from "./pitch-position.model";

export class MovementPosition extends PitchPosition {
  moveType: MoveType;

  constructor(row: number, col: number, moveType: MoveType) {
    super(row, col);
    this.moveType = moveType;
  }

  GetAllAdjacentMovements(moveType: MoveType) {
    const adjacentPitchPositions = super.GetAllAdjacent();
    const adjacentMovementPositions = adjacentPitchPositions.map(pitchPosition =>
      new MovementPosition(
        pitchPosition.row,
        pitchPosition.col,
        moveType
      )
    );

    return adjacentMovementPositions;
  }
}
