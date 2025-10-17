import { Team } from "../models/team.enum";
import { v4 as uuid } from 'uuid';

export class Player {
  public id: string;
  public team: Team;
  public ma: number;
  public ag: number;

  constructor(team: Team, id?: string){
    this.id = id ? id : uuid();
    this.team = team;
    this.ma = 6;
    this.ag = 3;
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
