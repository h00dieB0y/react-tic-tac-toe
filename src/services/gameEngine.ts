import { PLAYER_X, PLAYER_O, Player, Game } from '../types/game.d';

interface GameEngine {
    createGame: (gridSize: number, winCondition: number, initialPlayer?: Player) => Game;
    makeMove: (game: Game, index: number) => Game;
    isOver: (game: Game) => boolean;
    calculateWinner: (game: Game) => Player | null;
    iaMove: (game: Game) => number;
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

const gameEngine: GameEngine = {
    createGame: (gridSize: number, winCondition: number, initialPlayer: Player = PLAYER_X): Game => ({
        squares: Array(gridSize * gridSize).fill(null),
        gridSize,
        currentPlayer: initialPlayer,
        winCondition,
        winningLines: generateWinningLines(gridSize, winCondition),
        lastMove: null,
    }),
    

    makeMove: (game: Game, index: number): Game => {
        if (
            game.currentPlayer === null ||
            game.squares[index] !== null ||
            gameEngine.isOver(game)
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
    },

    isOver: (game: Game): boolean => {
        return gameEngine.calculateWinner(game) !== null || game.squares.every(square => square !== null);
    },

    calculateWinner: (game: Game): Player | null => {
        const { winningLines, lastMove, squares } = game;

        if (lastMove === null) return null;

        // Find all lines that include the last move
        const relevantLines = winningLines.filter(line => line.includes(lastMove));

        for (const line of relevantLines) {
            const [firstIndex, ...restIndices] = line;
            const firstPlayer = squares[firstIndex];
            if (firstPlayer === null) continue;

            const isWinningLine = restIndices.every(index => squares[index] === firstPlayer);
            if (isWinningLine) {
                return firstPlayer;
            }
        }

        return null;
    },

    iaMove: (game: Game): number => {
        // Random available move
        const availableMoves = game.squares
            .map((square, index) => (square === null ? index : null))
            .filter(index => index !== null) as number[];
        
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

};

export default gameEngine;