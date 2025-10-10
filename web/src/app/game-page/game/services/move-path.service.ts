import { Injectable } from '@angular/core';
import { PitchPosition } from '../../../models/pitch-position.model';

@Injectable({
  providedIn: 'root'
})
export class MovePathService {
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

  GetBestPath(start: PitchPosition, end: PitchPosition, players: PitchPosition[] = []) {
    const openSet: PitchPositionDistance[] = [
      {
        position: start,
        distance: 0,
        distanceH: this.GetDistanceHeuristic(start, end),
        priorPositionDistance: undefined
      }
    ];

    while(openSet.length > 0) {
      const currentPositionDistance = openSet.shift()!;

      if (currentPositionDistance.position.IsEqual(end)) {
        return this.ReconstructPath(currentPositionDistance).slice(1);
      }

      for (const moveDirection of this.MOVE_DIRECTIONS) {
        const newDistance = currentPositionDistance.distance + 1;
        const newPosition = new PitchPosition(
            currentPositionDistance.position.row + moveDirection.row_delta,
            currentPositionDistance.position.col + moveDirection.col_delta
        );
        const tentativePositionDistance: PitchPositionDistance = {
          position: newPosition,
          distance: newDistance,
          distanceH: newDistance + this.GetDistanceHeuristic(newPosition, end),
          priorPositionDistance: currentPositionDistance
        };

        if (!tentativePositionDistance.position.IsInBounds()) {
          continue;
        }

        if (this.IsOnPlayer(tentativePositionDistance.position, players)) {
          continue;
        }

        const existingPositionDistance = openSet.find(position =>
          position.position.row === tentativePositionDistance.position.row
          && position.position.col === tentativePositionDistance.position.col
        );

        if(!existingPositionDistance) {
          openSet.push(tentativePositionDistance);
        } else if (tentativePositionDistance.distance < existingPositionDistance.distance) {
          existingPositionDistance.priorPositionDistance = tentativePositionDistance.priorPositionDistance;
          existingPositionDistance.distance = tentativePositionDistance.distance;
          existingPositionDistance.distanceH = tentativePositionDistance.distanceH ;
        }
      }

      openSet.sort((a, b) => a.distanceH - b.distanceH);
    }

    return [];
  }

  private IsOnPlayer(position: PitchPosition, players: PitchPosition[]) {
    return players.some(player =>
      player.row === position.row
      && player.col === position.col
    );
  }

  private GetDistanceHeuristic(start: PitchPosition, end: PitchPosition) {
    return Math.sqrt(
      Math.pow(start.row - end.row, 2)
      + Math.pow(start.col - end.col, 2)
    ) / Math.sqrt(2);
  }

  private ReconstructPath(endPosition: PitchPositionDistance) {
    const path: PitchPosition[] = [ endPosition.position ];

    let currentPosition = endPosition.priorPositionDistance;
    while (currentPosition) {
      path.unshift(currentPosition.position);
      currentPosition = currentPosition.priorPositionDistance;
    }

    return path;
  }
}

interface PitchPositionDistance {
  position: PitchPosition,
  distance: number;
  distanceH: number; // Hueristic distance
  priorPositionDistance?: PitchPositionDistance;
}
