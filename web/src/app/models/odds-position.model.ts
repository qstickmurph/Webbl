import { PitchPosition } from './pitch-position.model'

export class OddsPosition extends PitchPosition {
  public odds: number;

  constructor(row: number, col: number, odds: number) {
    super(row, col);
    this.odds = odds;
  }

  public static FromPosition(position: PitchPosition, odds: number) {
    return new OddsPosition(position.row, position.col, odds);
  }
}
