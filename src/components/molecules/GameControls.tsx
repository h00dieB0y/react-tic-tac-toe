import React, {useState, useEffect} from "react";
import { useGameContext } from "../../contexts/GameContext";
import { Button, Col, Form, InputNumber, message, Row, Select } from "antd";
import { Player, PlayerType } from "../../types/player";
import styled from "styled-components";


const GameControls: React.FC = () => {
    const { resetGame } = useGameContext();

    const [form] = Form.useForm();
    const [gridSize, setGridSize] = useState<number>(3);
    const [winCondition, setWinCondition] = useState<number>(3);
    const [player, setPlayer] = useState<Player>(Player.X);


    const onStartGame = () => {
        form
            .validateFields()
            .then((_values) => {
                if (winCondition > gridSize) {
                    message.error("Win condition cannot be greater than grid size.");
                    return;
                }

                if (winCondition < 3 || gridSize < 3) {
                    message.error("Grid size and win condition must be at least 3.");
                    return;
                }

                resetGame();
                message.success("Game started!");
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
        }

    return (
        <ControlsContainer
            form={form}
            layout="vertical"
        >
                  <Row gutter={[16, 16]}>
        <Col xs={24} sm={6}>
          <Form.Item
            label="Grid Size"
            name="gridSize"
            initialValue={gridSize}
            rules={[
              { required: true, message: 'Please input grid size' },
              { type: 'number', min: 3, max: 10, message: 'Grid size must be between 3 and 10' },
            ]}
          >
            <InputNumber
              min={3}
              max={10}
              onChange={(value) => setGridSize(value ?? 3)}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={6}>
          <Form.Item
            label="Win Condition"
            name="winCondition"
            initialValue={winCondition}
            rules={[
              { required: true, message: 'Please input win condition' },
              { type: 'number', min: 3, max: 10, message: 'Win condition must be between 3 and 10' },
            ]}
          >
            <InputNumber
              min={3}
              max={10}
              onChange={(value) => setWinCondition(value ?? 3)}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={6}>
          <Form.Item label="Player" name="player" initialValue={player}>
            <Select onChange={(value: Player) => setPlayer(value)}>
              <Select.Option value={Player.X}>X</Select.Option>
              <Select.Option value={Player.O}>O</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={6}>
          <Form.Item label="AI Difficulty" name="aiDifficulty" initialValue={"random"}>
            <Select onChange={(value: 'Random' | 'Defensive' | 'Minimax') => {}}>
              <Select.Option value="Random">Random</Select.Option>
              <Select.Option value="Defensive">Defensive</Select.Option>
              <Select.Option value="Minimax">Minimax</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={6}>
          <Form.Item>
            <Button type="primary" block onClick={onStartGame}>
              Start Game
            </Button>
          </Form.Item>
        </Col>
        <Col xs={24} sm={6}>
          <Form.Item>
            <Button type="default" danger block onClick={resetGame}>
              Reset Game
            </Button>
          </Form.Item>
        </Col>
      </Row>
        </ControlsContainer>
    );
};

const ControlsContainer = styled(Form)`
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
`;

export default GameControls;