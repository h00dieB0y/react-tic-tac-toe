import Game from "../../models/Game";

export interface AIStrategy {
    determineMove: (game: Game) => number;
}
