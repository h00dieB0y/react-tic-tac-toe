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

    makeMove(index: number): void {
        if (this.currentPlayer === null || this.squares[index] !== null || this.isOver()) {
            return;
        }

        this.squares[index] = this.currentPlayer;
        this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X;
        this.lastMove = index;
        this.checkWinner();
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

    private generateWinningLines(): number[][] {
        const winningLines = [];

        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                const horizontalLine = [];
                const verticalLine = [];
                const diagonalLine = [];
                const diagonalLine2 = [];

                for (let k = 0; k < this.winCondition; k++) {
                    horizontalLine.push(i * this.gridSize + j + k);
                    verticalLine.push(j * this.gridSize + i + k);
                    diagonalLine.push(i * this.gridSize + j + k * (this.gridSize + 1));
                    diagonalLine2.push(i * this.gridSize + j + k * (this.gridSize - 1));
                }

                if (horizontalLine.length === this.winCondition) {
                    winningLines.push(horizontalLine);
                }

                if (verticalLine.length === this.winCondition) {
                    winningLines.push(verticalLine);
                }

                if (diagonalLine.length === this.winCondition) {
                    winningLines.push(diagonalLine);
                }

                if (diagonalLine2.length === this.winCondition) {
                    winningLines.push(diagonalLine2);
                }
            }
        }

        return winningLines;
    }
}
