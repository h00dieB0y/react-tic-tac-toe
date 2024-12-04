import React from "react";
import styled from "styled-components";
import { useGameContext } from "../../contexts/GameContext";

const GameInfo: React.FC = () => {
    const { gameState } = useGameContext();
    return (
        <InfoContainer>
            <p>Current Player: {gameState.currentPlayer ?? 'None'}</p>
            <p>Winner: {gameState.currentWinningLine ? gameState.squares[gameState.lastMove!] : 'None'}</p>
        </InfoContainer>
    );
};

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  p {
    margin: 0;
    font-size: 1.2em;
  }
`;

export default GameInfo;