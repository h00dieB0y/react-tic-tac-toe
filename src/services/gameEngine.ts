import { PLAYER_X, PLAYER_O, Player, Game } from '../types/player';
import { AIStrategy, RandomAiStrategie } from './aiStrategie';

interface GameEngineOptions {
    aiStrategy?: AIStrategy;
}

class GameEngine {
    private aiStrategy: AIStrategy;

    constructor(options?: GameEngineOptions) {
        this.aiStrategy = options?.aiStrategy || new RandomAiStrategie();
    }

    createGame(gridSize: number, winCondition: number, initialPlayer: Player = PLAYER_X): Game {
        return {
            squares: Array(gridSize * gridSize).fill(null),
            gridSize,
            currentPlayer: initialPlayer,
            winCondition,
            winningLines: generateWinningLines(gridSize, winCondition),
            currentWinningLine: null,
            lastMove: null,
        };
    }

    makeMove(game: Game, index: number): Game {
        if (
            game.currentPlayer === null ||
            game.squares[index] !== null ||
            this.isOver(game)
        ) {
            return game;
        }

        const newSquares = [...game.squares];
        newSquares[index] = game.currentPlayer;
        const newCurrentPlayer = game.currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;

        return {
            ...game,
            squares: newSquares,
            currentPlayer: newCurrentPlayer,
            lastMove: index,
        };
    }

    isOver(game: Game): boolean {
        const { winner } = this.calculateWinner(game);
        return winner !== null || game.squares.every(square => square !== null);
    }

    calculateWinner(game: Game): { winner: Player | null; winningLine: number[] | null } {
        const { winningLines, lastMove, squares } = game;

        if (lastMove === null) return { winner: null, winningLine: null };

        // Find all lines that include the last move
        const relevantLines = winningLines.filter(line => line.includes(lastMove));

        for (const line of relevantLines) {
            const [firstIndex, ...restIndices] = line;
            const firstPlayer = squares[firstIndex];
            if (firstPlayer === null) continue;

            const isWinningLine = restIndices.every(index => squares[index] === firstPlayer);
            if (isWinningLine) {
                return { winner: firstPlayer, winningLine: line };
            }
        }

        return { winner: null, winningLine: null };
    }

    iaMove(game: Game): number {
        return this.aiStrategy.determineMove(game);
    }
}

const generateWinningLines = (gridSize: number, winCondition: number): number[][] => {
    const lines: number[][] = [];

    // Horizontal lines
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x <= gridSize - winCondition; x++) {
            const line = [];
            for (let i = 0; i < winCondition; i++) {
                line.push(y * gridSize + x + i);
            }
            lines.push(line);
        }
    }

    // Vertical lines
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y <= gridSize - winCondition; y++) {
            const line = [];
            for (let i = 0; i < winCondition; i++) {
                line.push((y + i) * gridSize + x);
            }
            lines.push(line);
        }
    }

    // Diagonal lines (top-left to bottom-right)
    for (let x = 0; x <= gridSize - winCondition; x++) {
        for (let y = 0; y <= gridSize - winCondition; y++) {
            const line = [];
            for (let i = 0; i < winCondition; i++) {
                line.push((y + i) * gridSize + x + i);
            }
            lines.push(line);
        }
    }

    // Diagonal lines (top-right to bottom-left)
    for (let x = 0; x <= gridSize - winCondition; x++) {
        for (let y = winCondition - 1; y < gridSize; y++) {
            const line = [];
            for (let i = 0; i < winCondition; i++) {
                line.push((y - i) * gridSize + x + i);
            }
            lines.push(line);
        }
    }

    return lines;
};

export default GameEngine;