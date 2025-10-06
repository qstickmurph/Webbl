import { Component } from '@angular/core';
import { PlayerIconComponent } from '../player-icon/player-icon.component'
import { Player } from '../../models/player.model';
import { DEFAULT_PITCH_PLAYERS } from '../../constants/pitch-constants';
import { PitchPosition } from '../../models/pitch-position.model';

@Component({
  selector: 'app-pitch',
  imports: [
    PlayerIconComponent
  ],
  templateUrl: './pitch.component.html',
  styleUrl: './pitch.component.scss'
})
export class PitchComponent {
  public players: PitchPosition<Player>[] = [];

  constructor() {
    this.players = DEFAULT_PITCH_PLAYERS;
  }
}
