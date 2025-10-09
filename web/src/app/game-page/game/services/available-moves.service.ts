import { Injectable } from "@angular/core";
import { MoveType } from "../../../enums/move-type.enum";
import { PitchPosition } from "../../../models/pitch-position.model";
import { PITCH_COLS, PITCH_ROWS } from "../../../constants/pitch-constants";
import { MovementPosition } from "../../../models/movement-position.model";

@Injectable({
  providedIn: 'root'
})
export class AvailableMovesService {
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

  GetAvailableMoves(selectedPlayerPosition: PitchPosition, playerPositions: PitchPosition[], moveSpeed: number = 6, maxRush: number = 2) {
    const availableMoves: MovementPosition[] = [
      {
        position: {
          row: selectedPlayerPosition.row,
          col: selectedPlayerPosition.col
        },
        moveType: MoveType.normal
      }
    ];
    const reachablePlayers: MovementPosition[] = [];

    for (let moveNum: number = 0; moveNum < moveSpeed + maxRush; moveNum++) {
      const moveType = moveNum < moveSpeed ? MoveType.normal : MoveType.rush;
      const nextMoves = this.GetAllNextMoves(availableMoves, moveType);

      const nextAvailableMoves = nextMoves.filter(
        move => !this.IsOnPlayer(move.position, playerPositions) && !this.IsAlreadyAdded(move.position, availableMoves.map(x => x.position))
      );
      const nextReachablePlayers = nextMoves.filter(
        move => this.IsOnPlayer(move.position, playerPositions) && !this.IsAlreadyAdded(move.position, reachablePlayers.map(x => x.position))
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

    for (let priorMove of priorMoves) {
      const nextMoves = this.GetAdjacentPositions(priorMove.position, moveType);
      const uniqueNextMoves = nextMoves.filter(
        move => !this.IsAlreadyAdded(move.position, nextAvailableMoves.map(x => x.position))
      );
      nextAvailableMoves.push(...uniqueNextMoves);
    }

    return nextAvailableMoves;
  }

  private GetAdjacentPositions(position: PitchPosition, moveType: MoveType) {
    const adjacentPositions: MovementPosition[] = [];
    for (let moveDirection of this.MOVE_DIRECTIONS) {
      const adjacentPosition: MovementPosition = {
        position: {
          row: position.row + moveDirection.row_delta,
          col: position.col + moveDirection.col_delta
        },
        moveType: moveType
      };

      if (this.IsInBounds(adjacentPosition.position.row, adjacentPosition.position.col)) {
        adjacentPositions.push(adjacentPosition);
      }
    }

    return adjacentPositions;
  }

  private IsOnPlayer(position: PitchPosition, playerPositions: PitchPosition[]) {
    return playerPositions.some(
      playerPosition =>
        position.row === playerPosition.row
        && position.col === playerPosition.col
    );
  }

  private IsAlreadyAdded(newMove: PitchPosition, existingMoves: PitchPosition[]) {
    return existingMoves.some(
      existingMove =>
        newMove.row === existingMove.row
        && newMove.col === existingMove.col
    );
  }

  private IsInBounds(row: number, col: number) {
    return row >= 0
      && row < PITCH_ROWS
      && col >= 0
      && col < PITCH_COLS;
  }
}
