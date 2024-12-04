import styled from "styled-components";
import Board from "../molecules/Board.tsx";
import { Button, Form, InputNumber, Select } from "antd";
import useGameEngine from "../../hooks/useGameEngine";
import { useState, useEffect } from "react";
import { Player } from "../../types/game";


const GamePage = () => {
    const { gameState, winner, handleClick, startGame, iaMove } = useGameEngine({ gridSize: 3, winCondition: 3 });
    const [gridSize, setGridSize] = useState(3);
    const [winCondition, setWinCondition] = useState(3);
    const [player, setPlayer] = useState<Player>("X");

    const onStartGame = () => {
        if (winCondition > gridSize) {
            // Display an error message or disable the start button
            return;
        }
        startGame(player, gridSize, winCondition);
    };

    // Make the AI move
    useEffect(() => {
        if (gameState.currentPlayer === "O") {
            iaMove();
        }
    }, [gameState.currentPlayer]);


    return (
        <GameContainer>
            <GameControls
                layout="horizontal"
            >
                <Form.Item label="Grid Size">
                    <InputNumber
                        min={3}
                        max={10}
                        onChange={(value) => setGridSize(value ?? 3)}
                        value={gridSize}
                    />
                </Form.Item>
                <Form.Item label="Win Condition">
                    <InputNumber
                        min={3}
                        max={10}
                        onChange={(value) => setWinCondition(value ?? 3)}
                        value={winCondition}
                    />
                </Form.Item>
                <Form.Item label="Player">
                    <Select
                        value={player}
                        onChange={(value: Player) => setPlayer(value)}
                    >
                        <Select.Option value="X">X</Select.Option>
                        <Select.Option value="O">O</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={onStartGame}>Start Game</Button>
                </Form.Item>
            </GameControls>
            <GameBoard>
                <Board
                    gridSize={gameState.gridSize}
                    squares={gameState.squares}
                    onClick={handleClick}
                />
            </GameBoard>
            <GameInfo>
                <p>Player: {gameState.currentPlayer}</p>
                <p>Winner: {winner ?? "None"}</p>
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

export default GamePage;