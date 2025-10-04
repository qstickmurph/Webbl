import { Component, Input } from '@angular/core';
import { Team } from '../../enums/team.enum';

@Component({
  selector: 'app-player-icon',
  imports: [],
  templateUrl: './player-icon.component.html',
  styleUrl: './player-icon.component.scss'
})
export class PlayerIconComponent {
  @Input()
  public team: Team = Team.blue;

  getPlayerIconSrc() {
    return this.team === Team.blue
      ? 'assets/images/blue-lineman.png'
      : 'assets/images/red-lineman.png';
  }
}
