import { PitchPosition } from "./pitch-position.model";
import { Player } from "./player.model";

export class PlayerPosition extends PitchPosition {
  player: Player;

  constructor(row: number, col: number, player: Player) {
    super(row, col);
    this.player = player;
  }

  static FromPosition(position: PitchPosition, player: Player) {
    return new PlayerPosition(
      position.row,
      position.col,
      player
    );
  }

  MoveTo(position: PitchPosition) {
    this.row = position.row;
    this.col = position.col;
  }
}
