import { Injectable } from "@angular/core";
import { MoveType } from "../../../enums/move-type.enum";
import { MovementPosition, PitchPosition } from "../../../models/pitch-position.model";
import { Player } from "../../../models/player.model";
import { PITCH_COLS, PITCH_ROWS } from "../../../constants/pitch-constants";

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

  GetAvailableMoves(selectedPlayerPosition: PitchPosition, playerPositions: PitchPosition[]) {
    const availableMoves: MovementPosition[] = [
      {
        row: selectedPlayerPosition.row,
        col: selectedPlayerPosition.col,
        moveType: MoveType.normal
      }
    ];
    const reachablePlayers: MovementPosition[] = [];
    const moveSpeed = 6;
    const maxRush = 2;

    for (let moveNum: number = 0; moveNum < moveSpeed + maxRush; moveNum++) {
      const moveType = moveNum < moveSpeed ? MoveType.normal : MoveType.rush;
      const nextMoves = this.GetAllNextMoves(availableMoves, moveType);

      const nextAvailableMoves = nextMoves.filter(
        move => !this.IsOnPlayer(move, playerPositions) && !this.IsAlreadyAdded(move, availableMoves)
      );
      const nextReachablePlayers = nextMoves.filter(
        move => this.IsOnPlayer(move, playerPositions) && !this.IsAlreadyAdded(move, reachablePlayers)
      );

      console.log(nextAvailableMoves);

      availableMoves.push(...nextAvailableMoves);
      reachablePlayers.push(...nextReachablePlayers);
    }

    return [
      ...availableMoves,
      ...reachablePlayers
    ];
  }

  private GetAllNextMoves(priorMoves: PitchPosition[], moveType: MoveType) {
    const nextAvailableMoves: MovementPosition[] = [];

    for (let priorMove of priorMoves) {
      const nextMoves = this.GetAdjacentPositions(priorMove, moveType);
      const uniqueNextMoves = nextMoves.filter(
        move => !this.IsAlreadyAdded(move, nextAvailableMoves)
      );
      nextAvailableMoves.push(...uniqueNextMoves);
    }

    return nextAvailableMoves;
  }

  private GetAdjacentPositions(position: PitchPosition, moveType: MoveType) {
    const adjacentPositions: MovementPosition[] = [];
    for (let moveDirection of this.MOVE_DIRECTIONS) {
      const adjacentPosition: MovementPosition = {
        row: position.row + moveDirection.row_delta,
        col: position.col + moveDirection.col_delta,
        moveType: moveType
      };

      if (this.IsInBounds(adjacentPosition.row, adjacentPosition.col)) {
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
