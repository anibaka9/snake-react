import { useEffect, useState } from 'react';
import useGetPressedKey from './useGetPressedKey';
import { Direction } from './types';

export const usePressedGetDirection = (): Direction | null => {
  const pressedKey = useGetPressedKey();
  switch (pressedKey) {
    case 'KeyW':
      return '-y';
    case 'KeyS':
      return '+y';
    case 'KeyA':
      return '-x';
    case 'KeyD':
      return '+x';
    default:
      return null;
  }
};

export const useGetLastDirection = (): Direction | null => {
  const pressedDirection = usePressedGetDirection();
  const [direction, setDirection] = useState<Direction | null>(null);
  useEffect(() => {
    if (pressedDirection) {
      setDirection(pressedDirection);
    }
  }, [direction, pressedDirection]);
  return direction;
};
