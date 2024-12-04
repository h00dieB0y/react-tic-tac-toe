// src/components/pages/GamePage.tsx
import styled from "styled-components";
import Board from "../molecules/Board";
import {GameProvider} from "../../contexts/GameContext";
import GameControls from "../molecules/GameControls";
import GameInfo from "../molecules/GameInfo";

const GamePage: React.FC = () => {
    return (
      <GameProvider gridSize={3} winCondition={3}>
        <GameContainer>
          <GameControls />
          <BoardWrapper>
            <Board />
          </BoardWrapper>
          <GameInfo />
        </GameContainer>
      </GameProvider>
    );
  };
  const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
  const BoardWrapper = styled.div`
  width: 100%;
  max-width: 500px;
`;

export default GamePage;
