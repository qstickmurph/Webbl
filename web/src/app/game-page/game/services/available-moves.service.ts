import { Injectable } from "@angular/core";
import { MoveType } from "../../../models/move-type.enum";
import { PitchPosition } from "../../../models/pitch-position.model";
import { MovementPosition } from "../../../models/movement-position.model";

@Injectable({
  providedIn: 'root'
})
export class AvailableMovesService {
  GetAvailableMoves(selectedPlayerPosition: PitchPosition, playerPositions: PitchPosition[], moveSpeed: number = 6, maxRush: number = 2) {
    const availableMoves: MovementPosition[] = [
      new MovementPosition(
        selectedPlayerPosition.row,
        selectedPlayerPosition.col,
        MoveType.normal
      )
    ];
    const reachablePlayers: MovementPosition[] = [];

    for (let moveNum: number = 0; moveNum < moveSpeed + maxRush; moveNum++) {
      const moveType = moveNum < moveSpeed ? MoveType.normal : MoveType.rush;
      const nextMoves = this.GetAllNextMoves(availableMoves, moveType);

      const nextAvailableMoves = nextMoves.filter(
        move => !move.IsIn(playerPositions) && !move.IsIn(availableMoves)
      );
      const nextReachablePlayers = nextMoves.filter(
        move => move.IsIn(playerPositions) && !move.IsIn(reachablePlayers)
      );

      availableMoves.push(...nextAvailableMoves);
      reachablePlayers.push(...nextReachablePlayers);
    }

    return [
      ...availableMoves,
      ...reachablePlayers
    ];
  }

  private GetAllNextMoves(priorMoves: MovementPosition[], moveType: MoveType) {
    const nextAvailableMoves: MovementPosition[] = [];

    for (const priorMove of priorMoves) {
      const nextMoves = priorMove.GetAllAdjacentMovements(moveType);
      const uniqueNextMoves = nextMoves.filter(
        move => !move.IsIn(nextAvailableMoves.map(x => x))
      );
      nextAvailableMoves.push(...uniqueNextMoves);
    }

    return nextAvailableMoves;
  }
}
