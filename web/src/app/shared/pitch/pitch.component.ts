import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayerIconComponent } from '../player-icon/player-icon.component'
import { Player } from '../../models/player.model';
import { MovementPosition, PlayerPosition } from '../../models/pitch-position.model';
import { MoveType } from '../../enums/move-type.enum';

@Component({
  selector: 'app-pitch',
  imports: [
    PlayerIconComponent
  ],
  templateUrl: './pitch.component.html',
  styleUrl: './pitch.component.scss'
})
export class PitchComponent {
  @Input()
  public players: PlayerPosition[] = [];

  @Input()
  public selectedPlayer?: Player;

  @Input()
  public availableMoves: MovementPosition[] = [];

  @Output()
  public clickedOnPlayer = new EventEmitter<Player>();

  public moveType = MoveType;
}
