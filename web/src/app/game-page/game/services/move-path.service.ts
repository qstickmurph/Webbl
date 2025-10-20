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
  ) {
    if (start.GetDistance(end) === 1) {
      return [ end ];
    }

    const labelMap = this.GetAllNonDominatedLabels(start, end, player, currentDistance, players, tackleZones);
    const endLabels = labelMap.get(end.Id);
    if (!endLabels) {
      return [];
    }

    const optimalEndLabel = this.GetMinLabel(endLabels);
    const optimalPath = this.RetracePath(optimalEndLabel);

    return optimalPath;
  }

  private GetAllNonDominatedLabels(
    start: PitchPosition,
    end: PitchPosition,
    player: Player,
    currentDistance: number,
    players: PlayerPosition[] = [],
    tackleZones: TackleZonePosition[] = []
  ) {
    const startLabel: PitchPositionLabel = {
      distance: currentDistance,
      odds: 1,
      numDiagonals: 0,
      position: start,
      priorPositionLabel: undefined
    };
    const frontier: PitchPositionLabel[] = [ startLabel ];
    const labelMap: Map<number, PitchPositionLabel[]> = new Map([
      [
        start.Id,
        [ startLabel ]
      ]
    ]);

    while (frontier.length > 0) {
      const priorPositionLabel = frontier.shift()!;
      const priorPosition = priorPositionLabel.position;

      const adjacentPositions = priorPosition.GetAllAdjacent();
      for (const adjacentPosition of adjacentPositions) {
        const newDistance = priorPositionLabel.distance + 1;
        const moveOdds = this.gameOddsService.GetMoveOdds(
          priorPosition,
          adjacentPosition,
          player,
          tackleZones,
          newDistance
        );
        let numDiagonals = priorPositionLabel.numDiagonals;
        if (priorPosition.IsDiagonalMove(adjacentPosition)) {
          numDiagonals++;
        }

        const newAdjacentLabel: PitchPositionLabel = {
          distance: newDistance,
          odds: priorPositionLabel.odds * moveOdds,
          position: adjacentPosition,
          numDiagonals: numDiagonals,
          priorPositionLabel: priorPositionLabel
        };
        const existingLabels = labelMap.get(adjacentPosition.Id);

        if (this.ShouldAddToLabels(newAdjacentLabel, existingLabels, end, player.ma, players)) {
          if (existingLabels) {
            this.AddToLabels(newAdjacentLabel, existingLabels);
          } else {
            labelMap.set(adjacentPosition.Id, [ newAdjacentLabel ]);
          }

          if (!adjacentPosition.IsEqual(end)) {
            frontier.push(newAdjacentLabel);
          }
        }
      }
    }

    return labelMap;
  }

  private ShouldAddToLabels(
    newLabel: PitchPositionLabel,
    existingLabels: PitchPositionLabel[] | undefined,
    end: PitchPosition,
    ma: number,
    players: PitchPosition[]
  ) {
    const remainingMa = ma + 2 - newLabel.distance;
    const cannotReachEnd = newLabel.position.GetDistance(end) > remainingMa;
    if (cannotReachEnd) {
      return false;
    }

    const isOnPlayer = Boolean(newLabel.position.FindIn(players));
    if (isOnPlayer) {
      return false;
    }

    if (!existingLabels) {
      return true;
    }

    const isDominated = this.LabelIsDominated(newLabel, existingLabels);
    if (isDominated) {
      return false;
    }

    return true;
  }

  private LabelIsDominated(newLabel: PitchPositionLabel, existingLabels: PitchPositionLabel[]) {
    for (const existingLabel of existingLabels) {
      if (this.LabelDominates(existingLabel, newLabel)) {
        return true;
      }
    }

    return false;
  }

  private LabelDominates(a: PitchPositionLabel, b: PitchPositionLabel) {
    return a.odds >= b.odds
      && a.distance <= b.distance
      && a.numDiagonals <= b.numDiagonals;
  }

  private AddToLabels(newLabel: PitchPositionLabel, existingLabels: PitchPositionLabel[]) {
    this.RemoveDominatedLabels(existingLabels, newLabel);
    existingLabels.push(newLabel);
  }

  private RemoveDominatedLabels(existingLabels: PitchPositionLabel[], newLabel: PitchPositionLabel) {
    const nonDominatedLabels = [];
    for (const existingLabel of existingLabels) {
      if (!this.LabelDominates(newLabel, existingLabel)) {
        nonDominatedLabels.push(existingLabel);
      }
    }

    return nonDominatedLabels;
  }

  private GetMinLabel(labels: PitchPositionLabel[]) {
    let minLabel = labels[0];

    for (const label of labels.slice(1)) {
      if(this.LabelSortHelper(label, minLabel) < 0) {
        minLabel = label;
      }
    }

    return minLabel;
  }

  private LabelSortHelper(a: PitchPositionLabel, b: PitchPositionLabel) {
    return b.odds - a.odds
      || a.distance - b.distance
      || a.numDiagonals - b.numDiagonals;
  }

  private RetracePath(endLabel: PitchPositionLabel) {
    let currentLabel = endLabel;
    const path = [ ];

    while (currentLabel.priorPositionLabel) {
      path.unshift(currentLabel.position);
      currentLabel = currentLabel.priorPositionLabel!;
    }

    return path;
  }
}

interface PitchPositionLabel {
  distance: number;
  odds: number;
  numDiagonals: number;
  position: PitchPosition;
  priorPositionLabel?: PitchPositionLabel;
}
