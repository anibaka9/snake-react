import React from 'react';

interface CellProp extends JSX.IntrinsicAttributes {
  isSnake: boolean;
}

const Cell = ({ isSnake }: CellProp): JSX.Element => {
  return <div className={`field ${isSnake ? 'snake' : ''}`} />;
};

export default Cell;
