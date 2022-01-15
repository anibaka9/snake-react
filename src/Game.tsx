import React, { useState, useEffect } from 'react';
import * as R from 'ramda';
import './App.css';
import Field from './Field';
import { Snake, Direction, GameStates, Coodinates } from './types';
import { useGetLastDirection } from './directionalHooks';
import useRenderCurcle from './useRenderCurcle';
import Controls from './Controls';
import checkIfFieldInArray from './checkIfFieldInArray';

const gameSettins: {
  fieldWidth: number;
  fieldHeight: number;
  initialSnake: Snake;
  initialSpeed: number;
  initialDirection: Direction;
  maxSpeed: number;
  speedIncrement: number;
} = {
  fieldWidth: 15,
  fieldHeight: 15,
  initialSnake: [
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ],
  initialSpeed: 4,
  initialDirection: '+x',
  maxSpeed: 15,
  speedIncrement: 0.25,
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

const checkColisions = (
  newHead: Coodinates,
  snake: Snake,
  fieldWidth: number,
  fieldHeight: number,
): boolean =>
  !(
    newHead.x >= fieldWidth ||
    newHead.x < 0 ||
    newHead.y >= fieldHeight ||
    newHead.y < 0 ||
    checkIfFieldInArray(newHead, snake)
  );

const generateFood = (snake: Snake, fieldWidth: number, fieldHeight: number): Coodinates => {
  const numberOfFiels = fieldWidth * fieldHeight;
  const getRandomNumber = (a: number, b: number): number => {
    const min = a > b ? b : a;
    const max = a > b ? a : b;
    return Math.floor(Math.random() * (max - min) + min);
  };

  const numberOfEmptyFields = numberOfFiels - snake.length;

  const snakeFields: number[] = snake.map((el) => el.x + el.y * fieldHeight);

  const emptyFields = R.range(0, numberOfFiels).filter((el) => !snakeFields.includes(el));

  const randomNumberIndex = getRandomNumber(0, numberOfEmptyFields);

  const randomNumber = emptyFields[randomNumberIndex];

  return {
    x: randomNumber % fieldHeight,
    y: (randomNumber - (randomNumber % fieldWidth)) / fieldWidth,
  };
};

const App: React.FC = () => {
  const [snake, setSnake] = useState<Snake>([]);
  const [direction, setDirection] = useState<Direction>(gameSettins.initialDirection);
  const [lastPressedDirection, resetLastPressedDirection] = useGetLastDirection();
  const [gameState, setGameState] = useState<GameStates>('ready');
  const [food, setFood] = useState<Coodinates | null>(null);
  const [speed, setSpeed] = useState(gameSettins.initialSpeed);

  useEffect(() => {
    if (gameState === 'running') {
      const { fieldWidth, fieldHeight } = gameSettins;
      setFood(generateFood(snake, fieldWidth, fieldHeight));
    }
  }, [gameState, setFood]);

  const renderNow = useRenderCurcle({ fps: speed, on: gameState === 'running' });

  const startGame = () => {
    resetLastPressedDirection();
    setSnake(gameSettins.initialSnake);
    setDirection(gameSettins.initialDirection);
    setSpeed(gameSettins.initialSpeed);
    setGameState('running');
  };

  useEffect(() => {
    if (renderNow) {
      const currentHead = snake[0];

      const newDirection = getCorrectDirection(direction, lastPressedDirection);

      const offcet = getOffcetFromDirection(newDirection);

      setDirection(newDirection);

      resetLastPressedDirection();

      const newHead: Coodinates = { x: currentHead.x + offcet.x, y: currentHead.y + offcet.y };
      const noColisions = checkColisions(
        newHead,
        snake,
        gameSettins.fieldWidth,
        gameSettins.fieldHeight,
      );

      if (noColisions) {
        const foodEated = food && newHead.x === food.x && newHead.y === food.y;

        const newSnake: Snake = [newHead, ...(foodEated ? snake : snake.slice(0, -1))];
        if (foodEated) {
          if (speed < gameSettins.maxSpeed) setSpeed(speed + gameSettins.speedIncrement);

          setFood(generateFood(newSnake, gameSettins.fieldWidth, gameSettins.fieldHeight));
        }

        setSnake(newSnake);
      } else {
        setGameState('loose');
      }
    }
  }, [renderNow, snake, setSnake, direction, setDirection, lastPressedDirection]);

  return (
    <div>
      <Controls
        gameState={gameState}
        startGame={startGame}
        score={snake.length - gameSettins.initialSnake.length}
      />
      <Field
        fieldWidth={gameSettins.fieldWidth}
        fieldHeight={gameSettins.fieldHeight}
        snake={snake}
        food={food}
      />
    </div>
  );
};

export default App;
