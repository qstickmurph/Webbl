import { PitchPosition } from './pitch-position.model';

export class TackleZonePosition extends PitchPosition {
  numTackleZones: number;

  constructor(row: number, col: number, numTackleZones: number) {
    super(row, col);
    this.numTackleZones = numTackleZones;
  }

  static FromPosition(position: PitchPosition, numTackleZones: number) {
    return new TackleZonePosition(position.row, position.col, numTackleZones);
  }
}
