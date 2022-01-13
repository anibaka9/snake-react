import React, { useState, useEffect } from 'react';
import './App.css';
import Field from './Field';
import { Snake, Direction, Coodinates } from './types';
import { useGetLastDirection } from './directionalHooks';
import useRenderCurcle from './useRenderCurcle';

const gameSettins: {
  fieldWidth: number;
  fieldHeight: number;
  initialSnake: Snake;
  initialSpeed: number;
  initialDirection: Direction;
} = {
  fieldWidth: 10,
  fieldHeight: 10,
  initialSnake: [
    { x: 3, y: 0 },
    { x: 2, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ],
  initialSpeed: 4,
  initialDirection: '+x',
};

const getOffcetFromDirection = (direction: Direction | null): Coodinates => {
  const x = direction === '+x' ? 1 : direction === '-x' ? -1 : 0;
  const y = direction === '+y' ? 1 : direction === '-y' ? -1 : 0;
  return { x, y };
};

const getCorrectDirection = (
  direction: Direction,
  secondDirection: Direction | null,
): Direction => {
  const pressedOffcet = getOffcetFromDirection(secondDirection);
  const offcet = getOffcetFromDirection(direction);

  const directionIsInvalid =
    (pressedOffcet.x && pressedOffcet.x === -offcet.x) ||
    (pressedOffcet.y && pressedOffcet.y === -offcet.y);

  if (!directionIsInvalid && secondDirection) {
    return secondDirection;
  }
  return direction;
};

const App: React.FC = () => {
  const [snake, setSnake] = useState<Snake>(gameSettins.initialSnake);
  const [direction, setDirection] = useState<Direction>(gameSettins.initialDirection);
  const lastPressedDirection = useGetLastDirection();

  const renderNow = useRenderCurcle({ fps: gameSettins.initialSpeed, on: true });

  useEffect(() => {
    if (renderNow) {
      const currentHead = snake[0];

      const newDirection = getCorrectDirection(direction, lastPressedDirection);

      const offcet = getOffcetFromDirection(newDirection);

      setDirection(newDirection);

      const newHead: Coodinates = { x: currentHead.x + offcet.x, y: currentHead.y + offcet.y };
      const newSnake: Snake = [newHead, ...snake.slice(0, -1)];
      setSnake(newSnake);
    }
  }, [renderNow, snake, setSnake, direction, setDirection, lastPressedDirection]);

  return (
    <Field
      fieldWidth={gameSettins.fieldWidth}
      fieldHeight={gameSettins.fieldHeight}
      snake={snake}
    />
  );
};

export default App;
