import { PlayerPosition } from "../models/player-position.model";
import { BluePlayer, RedPlayer } from "../models/player.model";

export const PITCH_ROWS = 26;
export const PITCH_COLS = 15;

export const DEFAULT_PITCH_PLAYERS: PlayerPosition[] = [
  { position: { row: 5, col: 7 }, player: new RedPlayer() },
  { position: { row: 8, col: 7 }, player: new RedPlayer() },
  { position: { row: 10, col: 5 }, player: new RedPlayer() },
  { position: { row: 10, col: 9 }, player: new RedPlayer() },
  { position: { row: 11, col: 3 }, player: new RedPlayer() },
  { position: { row: 11, col: 11 }, player: new RedPlayer() },
  { position: { row: 12, col: 2 }, player: new RedPlayer() },
  { position: { row: 12, col: 4 }, player: new RedPlayer() },
  { position: { row: 12, col: 7 }, player: new RedPlayer() },
  { position: { row: 12, col: 10 }, player: new RedPlayer() },
  { position: { row: 12, col: 12 }, player: new RedPlayer() },
  { position: { row: 13, col: 2 }, player: new BluePlayer() },
  { position: { row: 13, col: 4 }, player: new BluePlayer() },
  { position: { row: 13, col: 7 }, player: new BluePlayer() },
  { position: { row: 13, col: 10 }, player: new BluePlayer() },
  { position: { row: 13, col: 12 }, player: new BluePlayer() },
  { position: { row: 14, col: 3 }, player: new BluePlayer() },
  { position: { row: 14, col: 11 }, player: new BluePlayer() },
  { position: { row: 15, col: 5 }, player: new BluePlayer() },
  { position: { row: 15, col: 9 }, player: new BluePlayer() },
  { position: { row: 17, col: 7 }, player: new BluePlayer() },
  { position: { row: 20, col: 7 }, player: new BluePlayer() },
];
