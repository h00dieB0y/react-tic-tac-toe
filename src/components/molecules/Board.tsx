import styled from "styled-components";
import Square from "../atoms/Square.tsx";

const Board = ({size}: { size: number }) => {
    const cellSize = MAX_GRID_WIDTH / size - 2;
    return (
        <Grid size={size}>
            {Array.from({length: size * size}).map((_, i) => (
                <Square key={i} size={cellSize} value={Math.random() > 0.5 ? 'X' : 'O'} onClick={() => {}} />
            ))}
        </Grid>
    );
};

const MAX_GRID_WIDTH = 500;

const Grid = styled.div<{ size: number }>`
    display: grid;
    grid-template-columns: repeat(${(props) => props.size}, 1fr);
    grid-template-rows: repeat(${(props) => props.size}, 1fr);
    gap: 5px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 24px;
`;

export default Board;