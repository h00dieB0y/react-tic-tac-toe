import {useEffect, useState, useCallback} from 'react';
import {Player} from "../types/player";
import Game from '../models/Game';
import { AIStrategy } from '../services/aiStrategie';
import { RandomAiStrategy } from '../services/ai/RandomAiStrategy';
import { message } from 'antd';

interface UseGameProps {
    gridSize: number;
    winCondition: number;
}

const useGameEngine = ({ gridSize, winCondition }: UseGameProps) => {
    const [gameState, setGameState] = useState<Game>(new Game(gridSize, winCondition));
    const [aiStrategy] = useState<AIStrategy>(new RandomAiStrategy());


    const handlePlayerMove = useCallback(
        (index: number) => {
            const updatedGame = gameState.clone();

            const isMoveMade = updatedGame.makeMove(index);

            if (isMoveMade) {
                setGameState(updatedGame);
            }
        },
        [gameState]
    );

    const handleAIMove = useCallback(() => {
        if (gameState.currentPlayer === null || gameState.isOver()) {
            return;
        }

        const move = aiStrategy.determineMove(gameState);

        if (move !== -1){
            handlePlayerMove(move);
        }
    }, [aiStrategy, gameState]);

    // Trigger launch of AI move when it's the AI's turn
    useEffect(() => {
        if (gameState.currentPlayer === null) {
            return;
        }

        // TODO: change when you can select the symbol of the player, actually it's always Player.O for AI
        if (gameState.currentPlayer === Player.O) {
            const maxDelay = 500;

            const timer = setTimeout(() => {
                handleAIMove();
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [gameState.currentPlayer, handleAIMove]);


    // Notify that the game is over and who won
    useEffect(() => {
        if (gameState.currentWinningLine) {
            message.success(`Player ${gameState.currentPlayer} won!`);
        } else if (gameState.isOver()) {
            message.info('It\'s a tie!');
        }
    }, [gameState]);

    const resetGame = useCallback(() => {
        setGameState(new Game(gridSize, winCondition));
    }, [gridSize, winCondition]);

    return {
        gameState,
        handlePlayerMove,
        resetGame,
    };
};

export default useGameEngine;