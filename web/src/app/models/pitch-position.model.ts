import { PITCH_COLS, PITCH_ROWS  } from "../constants/pitch-dimensions.constants";

export class PitchPosition {
  row: number;
  col: number;

  private readonly MOVE_DIRECTIONS: { row_delta: number; col_delta: number }[] = [
    { row_delta: -1, col_delta: -1 },
    { row_delta: -1, col_delta: 0 },
    { row_delta: -1, col_delta: 1 },
    { row_delta: 0, col_delta: -1 },
    { row_delta: 0, col_delta: 1 },
    { row_delta: 1, col_delta: -1 },
    { row_delta: 1, col_delta: 0 },
    { row_delta: 1, col_delta: 1 },
  ];

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  GetDistance(b: PitchPosition) {
    return Math.max(
      Math.abs(this.row - b.row),
      Math.abs(this.col - b.col)
    )
  }

  IsEqual(b: PitchPosition) {
    return this.row === b.row && this.col === b.col;
  }

  FindIn<T extends PitchPosition>(positions: T[]) {
    return positions.find(player =>
      player.row === this.row
      && player.col === this.col
    );
  }

  IsIn(positions: PitchPosition[]) {
    return positions.some(player =>
      player.row === this.row
      && player.col === this.col
    );
  }

  IsInBounds() {
    return this.row >= 0
      && this.row < PITCH_ROWS
      && this.col >= 0
      && this.col < PITCH_COLS;
  }

  GetAllAdjacent() {
    const adjacentPositions: PitchPosition[] = [];
    for (let moveDirection of this.MOVE_DIRECTIONS) {
      const adjacentPosition: PitchPosition = new PitchPosition(
        this.row + moveDirection.row_delta,
        this.col + moveDirection.col_delta
      );

      if (adjacentPosition.IsInBounds()) {
        adjacentPositions.push(adjacentPosition);
      }
    }

    return adjacentPositions;
  }
}
