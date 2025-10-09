import { Team } from "../enums/team.enum";
import { v4 as uuid } from 'uuid';

export class Player {
  public id: string;
  public team: Team;

  constructor(team: Team, id?: string){
    this.id = id ? id : uuid();
    this.team = team;
  }
}

export class BluePlayer extends Player {
  constructor() {
    super(Team.blue);
  }
}

export class RedPlayer extends Player {
  constructor() {
    super(Team.red);
  }
}
