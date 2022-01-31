import React, { useState, useEffect } from 'react';
import * as R from 'ramda';
import './App.css';
import Field from './Field';
import { Snake, Direction, GameStates, Coordinates, GameSettings } from './types';
import { useGetLastDirection } from './directionalHooks';
import useRenderCircle from './useRenderCircle';
import Controls from './Controls';
import checkIfFieldInArray from './checkIfFieldInArray';

const initialGameSettings: GameSettings = {
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

const getOffsetFromDirection = (direction: Direction | null): Coordinates => {
  const x = direction === '+x' ? 1 : direction === '-x' ? -1 : 0;
  const y = direction === '+y' ? 1 : direction === '-y' ? -1 : 0;
  return { x, y };
};

const getCorrectDirection = (
  direction: Direction,
  secondDirection: Direction | null,
): Direction => {
  const pressedOffset = getOffsetFromDirection(secondDirection);
  const offset = getOffsetFromDirection(direction);

  const directionIsInvalid =
    (pressedOffset.x && pressedOffset.x === -offset.x) ||
    (pressedOffset.y && pressedOffset.y === -offset.y);

  if (!directionIsInvalid && secondDirection) {
    return secondDirection;
  }
  return direction;
};

const checkCollisions = (
  newHead: Coordinates,
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

const generateFood = (snake: Snake, fieldWidth: number, fieldHeight: number): Coordinates => {
  const numberOfFields = fieldWidth * fieldHeight;
  const getRandomNumber = (a: number, b: number): number => {
    const min = a > b ? b : a;
    const max = a > b ? a : b;
    return Math.floor(Math.random() * (max - min) + min);
  };

  const numberOfEmptyFields = numberOfFields - snake.length;

  const snakeFields: number[] = snake.map((el) => el.x + el.y * fieldHeight);

  const emptyFields = R.range(0, numberOfFields).filter((el) => !snakeFields.includes(el));

  const randomNumberIndex = getRandomNumber(0, numberOfEmptyFields);

  const randomNumber = emptyFields[randomNumberIndex];

  return {
    x: randomNumber % fieldHeight,
    y: (randomNumber - (randomNumber % fieldWidth)) / fieldWidth,
  };
};

const App: React.FC = () => {
  const [gameSettings, setGameSettings] = useState<GameSettings>(initialGameSettings);
  const [snake, setSnake] = useState<Snake>([]);
  const [direction, setDirection] = useState<Direction>(initialGameSettings.initialDirection);
  const [lastPressedDirection, resetLastPressedDirection] = useGetLastDirection();
  const [gameState, setGameState] = useState<GameStates>('ready');
  const [food, setFood] = useState<Coordinates | null>(null);
  const [speed, setSpeed] = useState(initialGameSettings.initialSpeed);

  const setFieldSize = (size: number) => {
    setGameSettings({ ...gameSettings, fieldHeight: size, fieldWidth: size });
  };

  useEffect(() => {
    if (gameState === 'running') {
      const { fieldWidth, fieldHeight } = initialGameSettings;
      setFood(generateFood(snake, fieldWidth, fieldHeight));
    }
  }, [gameState, setFood]);

  const renderNow = useRenderCircle({ fps: speed, on: gameState === 'running' });

  const startGame = () => {
    resetLastPressedDirection();
    setSnake(gameSettings.initialSnake);
    setDirection(gameSettings.initialDirection);
    setSpeed(gameSettings.initialSpeed);
    setGameState('running');
  };

  useEffect(() => {
    if (renderNow && snake.length) {
      const currentHead = snake[0];

      const newDirection = getCorrectDirection(direction, lastPressedDirection);

      const offset = getOffsetFromDirection(newDirection);

      setDirection(newDirection);

      resetLastPressedDirection();

      const newHead: Coordinates = { x: currentHead.x + offset.x, y: currentHead.y + offset.y };
      const noCollisions = checkCollisions(
        newHead,
        snake,
        gameSettings.fieldWidth,
        gameSettings.fieldHeight,
      );

      if (noCollisions) {
        const foodEaten = food && newHead.x === food.x && newHead.y === food.y;

        const newSnake: Snake = [newHead, ...(foodEaten ? snake : snake.slice(0, -1))];
        if (foodEaten) {
          if (speed < gameSettings.maxSpeed) setSpeed(speed + gameSettings.speedIncrement);

          setFood(generateFood(newSnake, gameSettings.fieldWidth, gameSettings.fieldHeight));
        }

        setSnake(newSnake);
      } else {
        setGameState('lost');
      }
    }
  }, [renderNow, snake, setSnake, direction, setDirection, lastPressedDirection]);

  return (
    <div className="gameWrapper">
      <Controls
        gameState={gameState}
        startGame={startGame}
        score={snake.length - gameSettings.initialSnake.length}
        setFieldSize={setFieldSize}
      />
      <Field
        fieldWidth={gameSettings.fieldWidth}
        fieldHeight={gameSettings.fieldHeight}
        snake={snake}
        food={food}
      />
    </div>
  );
};

export default App;
