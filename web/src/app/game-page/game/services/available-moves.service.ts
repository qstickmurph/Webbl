import { Injectable } from "@angular/core";
import { MoveType } from "../../../enums/move-type.enum";
import { PitchPosition } from "../../../models/pitch-position.model";

@Injectable({
  providedIn: 'root'
})
export class AvailableMovesService {
  GetAvailableMoves(currentRow: number, currentCol: number) {
    const availableMoves: PitchPosition<MoveType>[] = [];
    const playerMovement = 6;

    for (let row: number = 0; row < 26; row++) {
      for (let col: number = 0; col < 15; col++) {
        const rowDifference = Math.abs(currentRow - row);
        const colDifference = Math.abs(currentCol - col);
        const totalDifference = rowDifference + colDifference;

        if (totalDifference > playerMovement + 2) {
          continue;
        }

        const availableMove: PitchPosition<MoveType> = {
          row: row,
          col: col,
          data: totalDifference <= playerMovement ? MoveType.normal : MoveType.rush
        };
        availableMoves.push(availableMove);
      }
    }

    return availableMoves;
  }
}
