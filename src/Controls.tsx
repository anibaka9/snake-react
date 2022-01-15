import React from 'react';
import { GameStates } from './types';

interface ControlsProps {
  gameState: GameStates;
  startGame: () => void;
  score: number;
}

const Controls = ({ gameState, startGame, score }: ControlsProps): JSX.Element => {
  return (
    <div className="controls">
      {gameState !== 'ready' && <p className="text">score: {score}</p>}
      {gameState === 'ready' && <button onClick={startGame}>Start game</button>}
      {gameState === 'loose' && (
        <>
          <p className="text">you loose</p>
          <button onClick={startGame}>Start over</button>
        </>
      )}
    </div>
  );
};

export default Controls;
