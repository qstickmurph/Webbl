import { inject, Injectable}  from '@angular/core';
import { PitchPosition } from '../../../models/pitch-position.model';
import { GameOddsService } from './game-odds.service';
import { Player } from '../../../models/player.model';
import { TackleZonePosition } from '../../../models/tackle-zone-position.model';
import { PlayerPosition } from '../../../models/player-position.model';

@Injectable({
  providedIn: 'root'
})
export class MovePathService {
  private readonly gameOddsService = inject(GameOddsService);

  GetBestPath(
    start: PitchPosition,
    end: PitchPosition,
    player: Player,
    currentDistance: number,
    players: PlayerPosition[] = [],
    tackleZones: TackleZonePosition[] = []
  ){
    const openSet: PitchPositionDistance[] = [
      {
        position: start,
        distance: currentDistance,
        distanceHeuristic: this.GetDistanceHeuristic(start, end),
        odds: 1.00,
        priorPositionDistance: undefined
      }
    ];

    const otherPlayers = players.filter(playerPosition =>
      playerPosition.player.id !== player.id
    );

    while(openSet.length > 0) {
      const currentPositionDistance = openSet.shift()!;

      if (currentPositionDistance.position.IsEqual(end)) {
        return this.ReconstructPath(currentPositionDistance).slice(1);
      }

      for (const adjacentPosition of currentPositionDistance.position.GetAllAdjacent()) {
        const newDistance = currentPositionDistance.distance + 1;
        const newOdds = currentPositionDistance.odds
          * this.GetMoveOdds(
            currentPositionDistance.position,
            adjacentPosition,
            newDistance,
            player,
            tackleZones
          );
        const adjacentPositionDistance: PitchPositionDistance = {
          position: adjacentPosition,
          distance: newDistance,
          distanceHeuristic: newDistance + this.GetDistanceHeuristic(adjacentPosition, end),
          odds: newOdds,
          priorPositionDistance: currentPositionDistance
        };

        if (!adjacentPositionDistance.position.IsInBounds()) {
          continue;
        }

        if (adjacentPositionDistance.distance > player.ma + 2) {
          continue;
        }

        if (this.IsOnPlayer(adjacentPositionDistance.position, otherPlayers)) {
          continue;
        }

        if (adjacentPosition.row === 14 && adjacentPosition.col === 13) {
          console.log(adjacentPositionDistance);
        }

        const existingPositionDistance = openSet.find(position =>
          position.position.row === adjacentPositionDistance.position.row
          && position.position.col === adjacentPositionDistance.position.col
        );

        if(!existingPositionDistance) {
          openSet.push(adjacentPositionDistance);
        } else if (this.SortByOddsThenDistanceHelper(adjacentPositionDistance, existingPositionDistance) > 0) {
          existingPositionDistance.priorPositionDistance = adjacentPositionDistance.priorPositionDistance;
          existingPositionDistance.distance = adjacentPositionDistance.distance;
          existingPositionDistance.distanceHeuristic = adjacentPositionDistance.distanceHeuristic ;
          existingPositionDistance.odds = adjacentPositionDistance.odds;
        }
      }

      openSet.sort(this.SortByOddsThenHeuristicHelper);
    }

    return [];
  }

  private GetMoveOdds(startPosition: PitchPosition, endPosition: PitchPosition, distance: number, player: Player, tackleZones: TackleZonePosition[]) {
    const isRushMove = distance > player.ma;
    const rushOdds = isRushMove ? this.gameOddsService.GetRushChance() : 1;
    const dodgeOdds = this.gameOddsService.GetDodgeChange(startPosition, endPosition, player, tackleZones);

    return rushOdds * dodgeOdds;
  }

  private SortByOddsThenDistanceHelper(a: PitchPositionDistance, b: PitchPositionDistance) {
    return (a.odds - b.odds)
      || (b.distance - a.distance);
  }

  private SortByOddsThenHeuristicHelper(a: PitchPositionDistance, b: PitchPositionDistance) {
    return (b.odds - a.odds)
      || (a.distanceHeuristic - b.distanceHeuristic);
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
  distanceHeuristic: number;
  odds: number;
  priorPositionDistance?: PitchPositionDistance;
}
