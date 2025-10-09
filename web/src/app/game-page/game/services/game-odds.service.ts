import { Injectable } from '@angular/core';
import { PitchPosition, PlayerPosition } from '../../../models/pitch-position.model';

@Injectable({
  providedIn: 'root'
})
export class GameOddsService {
  GetDodgeChange(start: PitchPosition, end: PitchPosition, players: PlayerPosition[]) {
    return 1;
  }
}
