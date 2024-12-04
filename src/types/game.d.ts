export const PLAYER_X = "X";
export const PLAYER_O = "O";

export type Player = typeof PLAYER_X | typeof PLAYER_O | null;

export interface Game {
    squares: Player[];
    gridSize: number;
    currentPlayer: Player;
    winCondition: number;
    winningLines: number[][];
    lastMove: number | null;
}
