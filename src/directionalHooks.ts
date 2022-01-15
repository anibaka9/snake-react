import { useEffect, useState } from 'react';
import useGetPressedKey from './useGetPressedKey';
import { Direction } from './types';

const keys: { [key in Direction]: string[] } = {
  '-y': ['KeyW', 'ArrowUp'],
  '+y': ['KeyS', 'ArrowDown'],
  '-x': ['KeyA', 'ArrowLeft'],
  '+x': ['KeyD', 'ArrowRight'],
};

const directions: Direction[] = ['-y', '+y', '-x', '+x'];

export const usePressedGetDirection = (): Direction | null => {
  const pressedKey = useGetPressedKey();
  if (!pressedKey) return null;
  return directions.find((el) => keys[el].includes(pressedKey)) || null;
};

export const useGetLastDirection = (): [Direction | null, () => void] => {
  const pressedDirection = usePressedGetDirection();
  const [direction, setDirection] = useState<Direction | null>(null);
  useEffect(() => {
    if (pressedDirection) {
      setDirection(pressedDirection);
    }
  }, [direction, pressedDirection]);

  const resetLastPressedDirection = () => setDirection(null);

  return [direction, resetLastPressedDirection];
};
