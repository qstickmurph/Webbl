import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayerIconComponent } from '../player-icon/player-icon.component'
import { PitchPosition } from '../../models/pitch-position.model';
import { MoveType } from '../../enums/move-type.enum';
import { PlayerPosition } from '../../models/player-position.model';
import { PitchDisplayState } from '../../models/pitch-display-state.model';
import { PitchDisplaySquare } from '../../models/pitch-display-square.model';


@Component({
  selector: 'app-pitch',
  imports: [
    PlayerIconComponent
  ],
  templateUrl: './pitch.component.html',
  styleUrl: './pitch.component.scss'
})
export class PitchComponent {
  @Input({ required: true }) public pitchState!: PitchDisplayState;

  @Output() public clickOnPlayer = new EventEmitter<PlayerPosition>();
  @Output() public clickOnAvailableMove = new EventEmitter<PitchPosition>();
  @Output() public dblClickOnAvailableMove = new EventEmitter<PitchPosition>();

  public moveType = MoveType;

  onClickOnPitchSquare(pitchSquare: PitchDisplaySquare) {
    if (this.pitchState.animating) {
      return;
    }

    const playerPositionClickedOn = pitchSquare.FindIn(this.pitchState.players);
    const availableMoveClickedOn = pitchSquare.FindIn(this.pitchState.availableMoves);

    if (playerPositionClickedOn) {
      this.clickOnPlayer.emit(playerPositionClickedOn);
    } else if (availableMoveClickedOn) {
      this.clickOnAvailableMove.emit(availableMoveClickedOn);
    }
  }

  onDblClickOnPitchSquare(pitchSquare: PitchDisplaySquare) {
    if (this.pitchState.animating) {
      return;
    }

    if (pitchSquare.isAvailableMove) {
      this.dblClickOnAvailableMove.emit(pitchSquare);
    }
  }

  onMouseEnterPitchSquare(pitchSquare: PitchDisplaySquare) {
    pitchSquare.isHighlighted = true;
  }

  onMouseLeavePitchSquare(pitchSquare: PitchDisplaySquare) {
    pitchSquare.isHighlighted = false;
  }
}
