export enum Player {
    X = 'X',
    O = 'O',
}

export type PlayerType = Player.X | Player.O | null;

export interface Game {
    squares: Player[];
    gridSize: number;
    currentPlayer: Player;
    winCondition: number;
    winningLines: number[][];
    lastMove: number | null;
    currentWinningLine: number[] | null;
}
