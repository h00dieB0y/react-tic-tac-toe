// src/components/atoms/Square.tsx
import React, { KeyboardEvent } from 'react';
import styled from 'styled-components';
import { PlayerType } from '../../types/player';

interface SquareProps {
  index: number;
  value: PlayerType;
  onClick: () => void;
  isWinningSquare?: boolean;
}

const Square: React.FC<SquareProps> = React.memo(({ index, value, onClick, isWinningSquare }) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <SquareDiv
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Square ${index + 1}: ${value ? value : 'empty'}`}
      aria-pressed={value !== null}
      aria-disabled={value !== null}
      isWinningSquare={isWinningSquare}
      value={value}
    >
      {value}
    </SquareDiv>
  );
});

/**
 * Styled Div for the Square
 */
const SquareDiv = styled.div<{
  isWinningSquare?: boolean;
  value: PlayerType;
}>`
  width: 100%;
  height: 100%;
  background-color: ${({ isWinningSquare }) => (isWinningSquare ? '#ffeb3b' : '#fff')};
  border-radius: 8px;
  border: 2px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  cursor: ${({ value }) => (value === null ? 'pointer' : 'not-allowed')};
  color: ${({ value }) => {
    if (value === 'X') return 'red';
    if (value === 'O') return 'blue';
    return '#000';
  }};
  transition: background-color 0.2s, transform 0.1s, border-color 0.2s;

  /* Accessibility Focus Styles */
  &:focus {
    outline: none;
    border-color: #666;
    box-shadow: 0 0 0 3px rgba(100, 100, 100, 0.5);
  }

  /* Hover Effect */
  &:hover {
    background-color: ${({ value }) => (value === null ? '#f0f0f0' : '#fff')};
  }

  /* Active State */
  &:active {
    transform: ${({ value }) => (value === null ? 'scale(0.95)' : 'none')};
  }

  /* Disabled State */
  &[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.6;
    background-color: ${({ isWinningSquare }) => (isWinningSquare ? '#ffeb3b' : '#fff')};
  }
`;

export default Square;
