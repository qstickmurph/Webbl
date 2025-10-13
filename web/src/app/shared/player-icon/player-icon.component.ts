import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Team } from '../../models/team.enum';
import { Player } from '../../models/player.model';

@Component({
  selector: 'app-player-icon',
  imports: [],
  templateUrl: './player-icon.component.html',
  styleUrl: './player-icon.component.scss'
})
export class PlayerIconComponent {
  @Input({ required: true })
  public player!: Player;

  @Output()
  public clickedOnPlayer = new EventEmitter<Player>;

  onClick() {
    this.clickedOnPlayer.emit(this.player);
  }

  getPlayerIconSrc() {
    return this.player?.team === Team.blue
      ? 'assets/images/blue-lineman.png'
      : 'assets/images/red-lineman.png';
  }
}
