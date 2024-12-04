import { Player, PlayerType } from "../types/player";

export default class Game {
    squares: PlayerType[];
    gridSize: number;
    currentPlayer: PlayerType;
    winCondition: number;
    winningLines: number[][];
    lastMove: number | null;
    currentWinningLine: number[] | null;


    constructor(gridSize: number, winCondition: number, initialPlayer: PlayerType = Player.X) {
        this.squares = Array(gridSize * gridSize).fill(null);
        this.gridSize = gridSize;
        this.currentPlayer = initialPlayer;
        this.winCondition = winCondition;
        this.winningLines = this.generateWinningLines();
        this.lastMove = null;
        this.currentWinningLine = null;
    }

    makeMove(index: number): boolean {
        if (this.currentPlayer === null || this.squares[index] !== null || this.isOver()) {
            return false;
        }

        this.squares[index] = this.currentPlayer;
        this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X;
        this.lastMove = index;
        this.checkWinner();

        return true;
    }

    isOver(): boolean {
        return this.currentPlayer === null || this.squares.every(square => square !== null);
    }

    checkWinner(): void {
        if (this.lastMove === null) {
            return;
        }

        const relevantLines = this.winningLines.filter(line => line.includes(this.lastMove as number));

        for (const line of relevantLines) {
            const firstSquare = this.squares[line[0]];

            if (firstSquare === null) {
                continue;
            }

            const isWinningLine = line.every(index => this.squares[index] === firstSquare);

            if (isWinningLine) {
                this.currentWinningLine = line;
                this.currentPlayer = null;
                return;
            }
        }
    }

    clone(): Game {
        const game = new Game(this.gridSize, this.winCondition, this.currentPlayer);
        game.squares = [...this.squares];
        game.currentPlayer = this.currentPlayer;
        game.lastMove = this.lastMove;
        game.currentWinningLine = this.currentWinningLine;
        return game;
    }

    private generateWinningLines(): number[][] {

        const lines: number[][] = [];

        // Horizontal
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x <= this.gridSize - this.winCondition; x++) {
                const line = [];
                for (let i = 0; i < this.winCondition; i++) {
                    line.push(y * this.gridSize + x + i);
                }
                lines.push(line);
            }
        }

        // Vertical
        for (let x = 0; x < this.gridSize; x++) {
            for (let y = 0; y <= this.gridSize - this.winCondition; y++) {
                const line = [];
                for (let i = 0; i < this.winCondition; i++) {
                    line.push((y + i) * this.gridSize + x);
                }
                lines.push(line);
            }
        }

        // Diagonal (Top-Left to Bottom-Right)
        for (let x = 0; x <= this.gridSize - this.winCondition; x++) {
            for (let y = 0; y <= this.gridSize - this.winCondition; y++) {
                const line = [];
                for (let i = 0; i < this.winCondition; i++) {
                    line.push((y + i) * this.gridSize + x + i);
                }
                lines.push(line);
            }
        }

        // Diagonal (Top-Right to Bottom-Left)
        for (let x = 0; x <= this.gridSize - this.winCondition; x++) {
            for (let y = this.winCondition - 1; y < this.gridSize; y++) {
                const line = [];
                for (let i = 0; i < this.winCondition; i++) {
                    line.push((y - i) * this.gridSize + x + i);
                }
                lines.push(line);
            }
        }

        return lines;
    }
}
