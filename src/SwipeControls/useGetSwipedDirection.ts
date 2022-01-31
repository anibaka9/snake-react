import { useContext } from 'react';
import SwipeContext from './SwipeContext';
import { Direction } from '../types';

const useGetSwipedDirection = (): Direction | null => {
  return useContext(SwipeContext);
};

export default useGetSwipedDirection;
