import { Injectable } from '@angular/core';
import { PitchPosition } from '../../../models/pitch-position.model';
import { PlayerPosition } from '../../../models/player-position.model';

@Injectable({
  providedIn: 'root'
})
export class GameOddsService {
  GetDodgeChange(start: PitchPosition, end: PitchPosition, players: PlayerPosition[]) {
    return 1;
  }
}
