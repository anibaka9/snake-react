import React from 'react';
import { Direction } from '../types';

const SwipeDirectionContext = React.createContext<Direction | null>(null);

export default SwipeDirectionContext;
