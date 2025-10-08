import { PlayerPosition } from "../models/pitch-position.model";
import { BluePlayer, RedPlayer } from "../models/player.model";

export const DEFAULT_PITCH_PLAYERS: PlayerPosition[] = [
  { row: 5, col: 7, player: new RedPlayer() },
  { row: 8, col: 7, player: new RedPlayer() },
  { row: 10, col: 5, player: new RedPlayer() },
  { row: 10, col: 9, player: new RedPlayer() },
  { row: 11, col: 3, player: new RedPlayer() },
  { row: 11, col: 11, player: new RedPlayer() },
  { row: 12, col: 2, player: new RedPlayer() },
  { row: 12, col: 4, player: new RedPlayer() },
  { row: 12, col: 7, player: new RedPlayer() },
  { row: 12, col: 10, player: new RedPlayer() },
  { row: 12, col: 12, player: new RedPlayer() },
  { row: 13, col: 2, player: new BluePlayer() },
  { row: 13, col: 4, player: new BluePlayer() },
  { row: 13, col: 7, player: new BluePlayer() },
  { row: 13, col: 10, player: new BluePlayer() },
  { row: 13, col: 12, player: new BluePlayer() },
  { row: 14, col: 3, player: new BluePlayer() },
  { row: 14, col: 11, player: new BluePlayer() },
  { row: 15, col: 5, player: new BluePlayer() },
  { row: 15, col: 9, player: new BluePlayer() },
  { row: 17, col: 7, player: new BluePlayer() },
  { row: 20, col: 7, player: new BluePlayer() },
];

export const PITCH_ROWS = 26;
export const PITCH_COLS = 15;
