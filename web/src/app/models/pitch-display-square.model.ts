import { PitchPosition } from "./pitch-position.model";
import { Player } from "./player.model";

type rgba = [number, number, number, number];

const highlightedSquareColor: rgba = [0, 0, 255, 0.3];
const availableMoveSquareColor: rgba = [255, 255, 255, 0.6];
const availableMoveRushSquareColor: rgba = [150, 150, 150, 0.6];
const displayedMoveSquareColor: rgba = [0 , 255, 255, 0.4];
const tackleZones1SquareColor: rgba = [255, 255, 0, 0.5];
const tackleZones2SquareColor: rgba = [255, 150, 0, 0.5];
const tackleZones3SquareColor: rgba = [255, 75, 0, 0.5];
const tackleZonesMaxSquareColor: rgba = [255, 0, 0, 0.5];

export class PitchDisplaySquare extends PitchPosition {
  player?: Player;
  isSelectedPlayer: boolean;
  isAvailableMove: boolean;
  isRush: boolean;
  isDisplayedMove: boolean;
  isHighlighted: boolean;
  moveNums: number[];
  tackleZones: number;

  constructor(row: number, col: number) {
    super(row, col);

    this.isSelectedPlayer= false;
    this.isAvailableMove = false;
    this.isRush = false;
    this.isDisplayedMove = false;
    this.isHighlighted = false;
    this.moveNums = [];
    this.tackleZones = 0;
  }

  public getBackgroundColor() {
    const listOfColorsToCombine: rgba[] = [];

    if (this.isAvailableMove) {
      if (this.isRush) {
        listOfColorsToCombine.push(availableMoveRushSquareColor);
      } else {
        listOfColorsToCombine.push(availableMoveSquareColor);
      }
    }

    if (this.isDisplayedMove) {
      listOfColorsToCombine.push(displayedMoveSquareColor);
    }

    if (this.isHighlighted) {
      listOfColorsToCombine.push(highlightedSquareColor);
    }

    if (this.tackleZones === 1) {
        listOfColorsToCombine.push(tackleZones1SquareColor);
    } else if (this.tackleZones === 2) {
        listOfColorsToCombine.push(tackleZones2SquareColor);
    } else if (this.tackleZones === 3) {
        listOfColorsToCombine.push(tackleZones3SquareColor);
    } else if (this.tackleZones >= 4) {
        listOfColorsToCombine.push(tackleZonesMaxSquareColor);
    }

    const finalRbga = this.combineColors(listOfColorsToCombine);

    return `rgba(${finalRbga[0]}, ${finalRbga[1]}, ${finalRbga[2]}, ${finalRbga[3] * listOfColorsToCombine.length / 2})`;
  }

  combineColors(colorsToCombine: rgba[]) {
    const combinedRgba: rgba = [0, 0, 0, 0];

    colorsToCombine.forEach(color => {
      combinedRgba[0] += color[0] / colorsToCombine.length;
      combinedRgba[1] += color[1] / colorsToCombine.length;
      combinedRgba[2] += color[2] / colorsToCombine.length;
      combinedRgba[3] += color[3] / colorsToCombine.length;
    });

    return combinedRgba;
  }
}
