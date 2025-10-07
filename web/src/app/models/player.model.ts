import { Team } from "../enums/team.enum";
import { v4 as uuid } from 'uuid';

export interface Player {
  id: string,
  team: Team
}

export class BluePlayer implements Player {
  public id: string;
  public team: Team;

  constructor() {
    this.id = uuid();
    this.team = Team.blue;
  }
}

export class RedPlayer implements Player {
  public id: string;
  public team: Team;

  constructor() {
    this.id = uuid();
    this.team = Team.red;
  }
}
