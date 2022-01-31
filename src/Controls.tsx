import React from 'react';
import { GameStates } from './types';

interface ControlsProps {
  gameState: GameStates;
  startGame: () => void;
  score: number;
  setFieldSize: (size: number) => void;
}

const gameSizes: number[] = [10, 15, 20];

const Controls = ({ gameState, startGame, score, setFieldSize }: ControlsProps): JSX.Element => {
  return (
    <div className="controls">
      {gameState !== 'ready' && <p className="text">score: {score}</p>}
      {gameState === 'ready' && <button onClick={startGame}>Start game</button>}
      {gameState !== 'running' && (
        <div className="select-filed-size-wrapper">
          {gameSizes.map((el) => (
            <button className="size-button" key={el} onClick={() => setFieldSize(el)}>
              {el}
            </button>
          ))}
        </div>
      )}
      {gameState === 'lost' && (
        <>
          <p className="text">You lost</p>
          <button onClick={startGame}>Start over</button>
        </>
      )}
    </div>
  );
};

export default Controls;
