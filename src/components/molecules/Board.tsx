import styled from "styled-components";
import Square from "../atoms/Square.tsx";
import React from "react";
import {Player} from "../../types/game";

interface BoardProps {
    squares: Player[];
    gridSize: number;
    winningLine: number[] | null;
    onClick: (i: number) => void;
}

const Board: React.FC<BoardProps> = ({ squares, gridSize, winningLine, onClick }) => {
    const squareSize = MAX_GRID_WIDTH / gridSize;
    const renderSquare = (i: number) => {
        const isWinningSquare = winningLine?.includes(i);

        return(
            <Square key={i} size={squareSize} value={squares[i]} onClick={() => onClick(i)} isWinningSquare={isWinningSquare} />
        );
    }

    return (
        <BoardContainer size={gridSize} squareSize={squareSize}>
            {squares.map((_, i) => renderSquare(i))}
        </BoardContainer>
    );
};

const MAX_GRID_WIDTH = 500;

const BoardContainer = styled.div<{ size: number; squareSize: number }>`
    display: grid;
    grid-template-columns: repeat(${props => props.size}, ${props => props.squareSize}px);
    grid-template-rows: repeat(${props => props.size}, ${props => props.squareSize}px);
    gap: 10px;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 18px;
`;

export default Board;