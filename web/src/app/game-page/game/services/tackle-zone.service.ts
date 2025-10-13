import { Injectable } from '@angular/core';
import { Team } from '../../../models/team.enum';
import { PlayerPosition } from '../../../models/player-position.model';
import { TackleZonePosition } from '../../../models/tackle-zone-position.model';

@Injectable({
  providedIn: 'root'
})
export class TackleZoneService {
  getTackleZones(playerPositions: PlayerPosition[], team: Team) {
    const tackleZones: TackleZonePosition[] = [];

    const opposingPlayers = playerPositions.filter(playerPosition => playerPosition.player.team !== team);

    opposingPlayers.forEach(player => {
      const adjacentPositions = player.GetAllAdjacent();

      adjacentPositions.forEach(position => {
        const existingTackleZone = position.FindIn(tackleZones);
        if (existingTackleZone) {
          existingTackleZone.numTackleZones++;
        } else {
          tackleZones.push(TackleZonePosition.FromPosition(position, 1));
        }
      });
    });

    return tackleZones;
  }
}
