import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-odds-popover',
  imports: [],
  templateUrl: './odds-popover.component.html',
  styleUrl: './odds-popover.component.scss'
})
export class OddsPopoverComponent implements OnInit, OnChanges{
  @Input({ required: true }) displayedOdds!: number;

  public oddsDisplayText: string = "";
  public textColor: string = "white";

  private readonly DARK_GREEN = "#22853e";
  private readonly GREEN = "#02eb44";
  private readonly YELLOW = "#fbff00";
  private readonly ORANGE = "#ffc400";
  private readonly RED = "#ff2a00";
  private readonly DARK_RED = "#913320";

  ngOnInit() {
    this.setupDisplayText();
    this.setupTextColor();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['displayedOdds']) {
      this.onDisplayedOddsChanges(changes['displayedOdds']);
    }
  }

  private onDisplayedOddsChanges(change: SimpleChange) {
    this.displayedOdds = change.currentValue;
    this.setupDisplayText();
    this.setupTextColor();
  }

  private setupDisplayText() {
    const oddsAsPercentage = Math.round(this.displayedOdds * 1000) / 10;
    this.oddsDisplayText = `${oddsAsPercentage}%`;
  }

  private setupTextColor() {
    if (this.displayedOdds >= 5/6) {
      this.textColor = this.DARK_GREEN;
    } else if (this.displayedOdds >= 4/6) {
      this.textColor = this.GREEN;
    } else if (this.displayedOdds >= 3/6) {
      this.textColor = this.YELLOW;
    } else if (this.displayedOdds >= 2/6) {
      this.textColor = this.ORANGE;
    } else if (this.displayedOdds >= 1/6) {
      this.textColor = this.RED;
    } else {
      this.textColor = this.DARK_RED;
    }
  }
}
