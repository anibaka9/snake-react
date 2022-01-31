import React, { useState } from 'react';
import { useSwipeable, SwipeDirections } from 'react-swipeable';
import SwipeContext from './SwipeContext';
import { Direction } from '../types';

const keys: { [key in SwipeDirections]: Direction } = {
  Up: '-y',
  Down: '+y',
  Left: '-x',
  Right: '+x',
};

const SwipeProvider: React.FC = ({ children }) => {
  const [direction, setDirection] = useState<Direction | null>(null);
  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      const { dir } = eventData;
      setDirection(keys[dir]);
    },
    onSwiped: () => setDirection(null),
  });

  console.log('direction', direction);

  return (
    <SwipeContext.Provider value={direction}>
      <div className="swipe-container" {...handlers}>
        {children}
      </div>
    </SwipeContext.Provider>
  );
};

export default SwipeProvider;
