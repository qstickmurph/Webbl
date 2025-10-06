import { PitchPosition } from "../models/pitch-position.model";
import { BluePlayer, Player, RedPlayer } from "../models/player.model";

export const DEFAULT_PITCH_PLAYERS: PitchPosition<Player>[] = [
  { row: 5, col: 7, data: new RedPlayer() },
  { row: 8, col: 7, data: new RedPlayer() },
  { row: 10, col: 5, data: new RedPlayer() },
  { row: 10, col: 9, data: new RedPlayer() },
  { row: 11, col: 3, data: new RedPlayer() },
  { row: 11, col: 11, data: new RedPlayer() },
  { row: 12, col: 2, data: new RedPlayer() },
  { row: 12, col: 4, data: new RedPlayer() },
  { row: 12, col: 7, data: new RedPlayer() },
  { row: 12, col: 10, data: new RedPlayer() },
  { row: 12, col: 12, data: new RedPlayer() },
  { row: 13, col: 2, data: new BluePlayer() },
  { row: 13, col: 4, data: new BluePlayer() },
  { row: 13, col: 7, data: new BluePlayer() },
  { row: 13, col: 10, data: new BluePlayer() },
  { row: 13, col: 12, data: new BluePlayer() },
  { row: 14, col: 3, data: new BluePlayer() },
  { row: 14, col: 11, data: new BluePlayer() },
  { row: 15, col: 5, data: new BluePlayer() },
  { row: 15, col: 9, data: new BluePlayer() },
  { row: 17, col: 7, data: new BluePlayer() },
  { row: 20, col: 7, data: new BluePlayer() },
];
