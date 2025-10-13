import { Injectable } from '@angular/core';
import { PitchPosition } from '../../../models/pitch-position.model';
import { TackleZonePosition } from '../../../models/tackle-zone-position.model';

@Injectable({
  providedIn: 'root'
})
export class GameOddsService {
  GetDodgeChange(start: PitchPosition, end: PitchPosition, tackleZones: TackleZonePosition[]) {
    const hasToDodge = start.IsIn(tackleZones);
    if (!hasToDodge) {
      return 1;
    }

    const ag = 3;

    const tackleZonesAtEnd = end.FindIn(tackleZones)?.numTackleZones ?? 0;

    return (7 - ag - tackleZonesAtEnd) / 6;
  }
}
