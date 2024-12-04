// src/components/molecules/Board.tsx
import React from 'react';
import styled from 'styled-components';
import Square from '../atoms/Square';
import { useGameContext } from '../../contexts/GameContext';

const Board: React.FC = () => {
  const { gameState, handlePlayerMove } = useGameContext();
  const SquareSize = 500 / gameState.gridSize;

  const renderSquare = (index: number) => {
    const isWinningSquare = gameState.currentWinningLine?.includes(index) || false;
    return (
      <Square
        key={index}
        size={SquareSize}
        value={gameState.squares[index]}
        onClick={() => handlePlayerMove(index)}
        isWinningSquare={isWinningSquare}
      />
    );
 };

  const squares = Array.from({ length: gameState.gridSize * gameState.gridSize }, (_, i) => renderSquare(i));

  return <BoardContainer gridSize={gameState.gridSize}>{squares}</BoardContainer>;
};

const BoardContainer = styled.div<{ gridSize: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.gridSize}, 1fr);
  grid-template-rows: repeat(${props => props.gridSize}, 1fr);
  gap: 10px;
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1 / 1;
  margin: 0 auto;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 18px;

  @media (max-width: 600px) {
    max-width: 90vw;
  }
`;

export default Board;
