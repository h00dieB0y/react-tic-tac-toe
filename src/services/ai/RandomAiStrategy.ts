import { AIStrategy } from "./AIStrategy";
import Game from "../../models/Game";

export class RandomAiStrategy implements AIStrategy {
    determineMove(game: Game): number {
        const emptySquares = game.squares
            .map((square, index) => square === null ? index : null)
            .filter((index) => index !== null);
        
        if (emptySquares.length === 0) {
            return -1;
        }

        const randomIndex = Math.floor(Math.random() * emptySquares.length);

        return emptySquares[randomIndex];
    }
}
