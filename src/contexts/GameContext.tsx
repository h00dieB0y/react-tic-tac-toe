import React, {createContext, useContext} from "react";
import useGame from "../hooks/useGame";

interface GameContextValue {
    gameState: ReturnType<typeof useGame>['gameState'];
    handlePlayerMove: ReturnType<typeof useGame>['handlePlayerMove'];
    handleAIMove: ReturnType<typeof useGame>['handleAIMove'];
    resetGame: ReturnType<typeof useGame>['resetGame'];
}

interface GameProviderProps {
    children: React.ReactNode;
    gridSize?: number;
    winCondition?: number;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

export const GameProvider: React.FC<GameProviderProps> = ({children, gridSize = 3, winCondition = 3}) => {
    const game = useGame({gridSize, winCondition});

    return (
        <GameContext.Provider value={game}>
            {children}
        </GameContext.Provider>
    );
}

export const useGameContext = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within a GameProvider");
    }
    return context;
}
