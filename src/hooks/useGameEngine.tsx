import {useEffect, useState} from 'react';
import gameEngine from "../services/gameEngine";
import {Game, Player} from "../types/game";
import GameEngine from '../services/gameEngine';

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
    const [gameEngine] = useState(new GameEngine());
    const [gameState, setGameState] = useState(gameEngine.createGame(gridSize, winCondition));
    const [winner, setWinner] = useState<Player | null>(null);

    const handleClick = (i: number) => {
        const updatedGame = gameEngine.makeMove(gameState, i);
        setGameState(updatedGame);
    }

    const iaMove = () => {
        const iaIndex = gameEngine.iaMove(gameState);
        
        const updatedGame = gameEngine.makeMove(gameState, iaIndex);
        setGameState(updatedGame);
    }

    const resetGame = () => {
        setGameState(gameEngine.createGame(gridSize, winCondition));
        setWinner(null);
    }

    const startGame = (playerSymbol: Player, gridSize: number, winCondition: number) => {
        setGameState(gameEngine.createGame(gridSize, winCondition, playerSymbol));
        setWinner(null);
    }
    

    useEffect(() => {
        setWinner(gameEngine.calculateWinner(gameState));
    }, [gameState, gameEngine]);

    return { gameState, winner, handleClick, resetGame, startGame, iaMove };
};

export default useGameEngine;