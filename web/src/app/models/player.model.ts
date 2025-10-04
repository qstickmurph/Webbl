import { Team } from "../enums/team.enum";

export interface Player {
  team: Team
}

export class BluePlayer implements Player {
  public team: Team;

  constructor() {
    this.team = Team.blue;
  }
}

export class RedPlayer implements Player {
  public team: Team;

  constructor() {
    this.team = Team.red;
  }
}
