import styled from "styled-components";
import Square from "../atoms/Square.tsx";



const Board = ({gridSize}: { gridSize: number }) => {
    const squareSize = MAX_GRID_WIDTH / gridSize - 2;

    const renderSquare = (i: number) =>
        <Square key={i} size={squareSize} value={Math.random() > 0.5 ? 'X' : 'O'} onClick={() => {}} />;

    return (
        <BoardContainer size={gridSize} squareSize={squareSize}>
            {Array.from({ length: gridSize * gridSize }, (_, i) => renderSquare(i))}
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