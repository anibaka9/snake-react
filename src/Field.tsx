import React from 'react';
import * as R from 'ramda';
import Cell from './Cell';
import { Snake } from './types';

interface FieldProp {
  fieldWidth: number;
  fieldHeight: number;
  snake: Snake;
}

const Field = ({ fieldWidth, fieldHeight, snake }: FieldProp): JSX.Element => {
  return (
    <div className="wrapper">
      {R.range(0, fieldWidth * fieldHeight).map((index) => {
        const y = (index - (index % fieldWidth)) / fieldWidth;
        const x = index % fieldHeight;
        const isSnake = snake.some((el) => Boolean(el.x === x && el.y === y));
        return <Cell key={index} isSnake={isSnake} />;
      })}
    </div>
  );
};

export default Field;
