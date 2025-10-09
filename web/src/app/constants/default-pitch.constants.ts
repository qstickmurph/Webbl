import { PlayerPosition } from "../models/player-position.model";
import { BluePlayer, RedPlayer } from "../models/player.model";

export const PITCH_ROWS = 26;
export const PITCH_COLS = 15;

export const DEFAULT_PITCH_PLAYERS: PlayerPosition[] = [
  new PlayerPosition(5, 7, new RedPlayer()),
  new PlayerPosition(8, 7, new RedPlayer()),
  new PlayerPosition(10, 5, new RedPlayer()),
  new PlayerPosition(10, 9, new RedPlayer()),
  new PlayerPosition(11, 3, new RedPlayer()),
  new PlayerPosition(11, 11, new RedPlayer()),
  new PlayerPosition(12, 2, new RedPlayer()),
  new PlayerPosition(12, 4, new RedPlayer()),
  new PlayerPosition(12, 7, new RedPlayer()),
  new PlayerPosition(12, 10, new RedPlayer()),
  new PlayerPosition(12, 12, new RedPlayer()),
  new PlayerPosition(13, 2, new BluePlayer()),
  new PlayerPosition(13, 4, new BluePlayer()),
  new PlayerPosition(13, 7, new BluePlayer()),
  new PlayerPosition(13, 10, new BluePlayer()),
  new PlayerPosition(13, 12, new BluePlayer()),
  new PlayerPosition(14, 3, new BluePlayer()),
  new PlayerPosition(14, 11, new BluePlayer()),
  new PlayerPosition(15, 5, new BluePlayer()),
  new PlayerPosition(15, 9, new BluePlayer()),
  new PlayerPosition(17, 7, new BluePlayer()),
  new PlayerPosition(20, 7, new BluePlayer()),
];
