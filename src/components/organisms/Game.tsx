import styled from "styled-components";
import Board from "../molecules/Board.tsx";
import {Button, Form, InputNumber} from "antd";

const Game = () => {
    return (
        <GameContainer>
            <GameControls
                layout="horizontal"
            >
                <Form.Item label="Grid Size">
                    <InputNumber min={3} max={10} defaultValue={4}/>
                </Form.Item>
                <Form.Item label="Win Condition">
                    <InputNumber min={3} max={10} defaultValue={4}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary">Start Game</Button>
                </Form.Item>
            </GameControls>
            <GameBoard>
                <Board gridSize={4}/>
            </GameBoard>
            <GameInfo>
                <p>Player: X</p>
                <p>Winner: None</p>
            </GameInfo>
        </GameContainer>
    );
};


const GameContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const GameControls = styled(Form)`
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
`;

const GameBoard = styled.div`
`;

const GameInfo = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    
`;

export default Game;