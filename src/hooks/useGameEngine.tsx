import {useEffect, useState} from 'react';
import gameEngine from "../services/gameEngine";
import {Game, Player} from "../types/game";

interface UseGameEngineProps {
    gridSize: number;
    winCondition: number;
}

interface UseGameEngineReturn {
    gameState: Game;
    handleClick: (i: number) => void;
    winner: Player | null;
    startGame: (playerSymbol: Player, gridSize: number, winCondition: number) => void;
    resetGame: () => void;
    iaMove: () => void;
}

const useGameEngine = ({ gridSize, winCondition }: UseGameEngineProps): UseGameEngineReturn => {
    const [gameState, setGameState] = useState(gameEngine.createGame(gridSize, winCondition));
    const [winner, setWinner] = useState<Player | null>(null);

    const handleClick = (i: number) => {
        setGameState((game) => gameEngine.makeMove(game, i));
    }

    const iaMove = () => {
        setGameState((game) => gameEngine.makeMove(game, gameEngine.iaMove(game)));
    }

    const resetGame = () => {
        setGameState(gameEngine.createGame(gridSize, winCondition));
    }

    const startGame = (playerSymbol: Player, gridSize: number, winCondition: number) => {
        setGameState(gameEngine.createGame(gridSize, winCondition, playerSymbol));
        setWinner(null);
    }
    

    useEffect(() => {
        setWinner(gameEngine.calculateWinner(gameState));
    }, [gameState]);

    return { gameState, winner, handleClick, resetGame, startGame, iaMove };
};

export default useGameEngine;