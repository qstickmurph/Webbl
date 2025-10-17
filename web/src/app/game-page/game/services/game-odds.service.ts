import { Injectable } from '@angular/core';
import { PitchPosition } from '../../../models/pitch-position.model';
import { TackleZonePosition } from '../../../models/tackle-zone-position.model';
import { Player } from '../../../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class GameOddsService {
  GetMoveOdds(start: PitchPosition, end: PitchPosition, player: Player, tackleZones: TackleZonePosition[], moveNumber: number) {
    let moveOdds = 1;
    if (moveNumber > player.ma) {
      moveOdds *= this.GetRushChance();
    }

    moveOdds *= this.GetDodgeChance(start, end, player, tackleZones);

    return moveOdds;
  }

  GetDodgeChance(start: PitchPosition, end: PitchPosition, player: Player, tackleZones: TackleZonePosition[]) {
    const hasToDodge = start.IsIn(tackleZones);
    if (!hasToDodge) {
      return 1;
    }

    const tackleZonesAtEnd = end.FindIn(tackleZones)?.numTackleZones ?? 0;

    return (7 - player.ag - tackleZonesAtEnd) / 6;
  }

  GetRushChance() {
    return 5 / 6;
  }
}
