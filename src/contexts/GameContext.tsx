import React, {createContext, useContext} from "react";
import useGameEngine from "../hooks/useGame";
import {Game, Player} from "../types/game";

interface GameContextValue {
    gameState: Game;
    winner: Player | null;
    handleClick: (i: number) => void;
    startGame: (playerSymbol: Player, gridSize: number, winCondition: number) => void;
    resetGame: () => void;
}

interface GameProviderProps {
    children: React.ReactNode;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

export const GameProvider: React.FC<GameProviderProps> = ({children}) => {
    const {gameState, winner, handleClick, startGame, resetGame} = useGameEngine({gridSize: 3, winCondition: 3});

    return (
        <GameContext.Provider value={{gameState, winner, handleClick, startGame, resetGame}}>
            {children}
        </GameContext.Provider>
    );
}

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within a GameProvider");
    }
    return context;
}
