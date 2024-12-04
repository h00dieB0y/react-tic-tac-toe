import {Game, Player} from "../types/game";

export interface AIStrategy {
    determineMove: (game: Game) => number;
}

export class RandomAiStrategie implements AIStrategy {
    determineMove(game: Game): number {
        const emptySquares = game.squares.map((square, index) => square === null ? index : null).filter((index) => index !== null);
        return emptySquares[Math.floor(Math.random() * emptySquares.length)];
    }
}
