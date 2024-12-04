// src/components/pages/GamePage.tsx
import styled from "styled-components";
import Board from "../molecules/Board";
import { Button, Form, InputNumber, Select, message } from "antd";
import {useGame} from "../../contexts/GameContext";
import { useState, useEffect } from "react";
import { Player, PLAYER_O, PLAYER_X } from "../../types/game.d";

const GamePage: React.FC = () => {
    const { gameState, winner, handleClick, startGame, iaMove, winningLine } = useGame();
    const [gridSize, setGridSize] = useState<number>(3);
    const [winCondition, setWinCondition] = useState<number>(3);
    const [player, setPlayer] = useState<Player>(PLAYER_X);

    const onStartGame = () => {
        if (winCondition > gridSize) {
            message.error("Win condition cannot be greater than grid size.");
            return;
        }

        if (winCondition < 3 || gridSize < 3) {
            message.error("Grid size and win condition must be at least 3.");
            return;
        }

        startGame(player, gridSize, winCondition);
    };

    useEffect(() => {
        if (gameState.currentPlayer === PLAYER_O) {
            iaMove();
        }
    }, [gameState.currentPlayer, gameState.lastMove, handleClick]);

    useEffect(() => {
        if (winner) {
            message.success(`Player ${winner} wins!`);
        }
    }, [winner]);

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
                    winningLine={winningLine}
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
