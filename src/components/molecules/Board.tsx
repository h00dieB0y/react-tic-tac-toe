import styled from "styled-components";

const Board = ({ size }: { size: number }) => {
    const cellSize = MAX_GRID_WIDTH / size - 2;
  return (
    <Grid size={size}>
      {Array.from({ length: size * size }).map((_, i) => (
        <Cell key={i} size={cellSize} />
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

const Cell = styled.div<{ size?: number }>(
    ({ size = 3 }) => `
        width: ${size}px;
        height: ${size}px;
        background-color: #fff;
        border-radius: 16px;
        border: 1px solid #ccc;
        `
    );



export default Board;