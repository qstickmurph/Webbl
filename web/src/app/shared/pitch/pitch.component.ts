import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayerIconComponent } from '../player-icon/player-icon.component'
import { Player } from '../../models/player.model';
import { PitchPosition } from '../../models/pitch-position.model';
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
  public players: PitchPosition<Player>[] = [];

  @Input()
  public selectedPlayer?: Player;

  @Input()
  public availableMoves: PitchPosition<MoveType>[] = [];

  @Output()
  public clickedOnPlayer = new EventEmitter<Player>();

  public moveType = MoveType;
}
