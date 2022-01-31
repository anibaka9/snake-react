import React from 'react';
import * as R from 'ramda';
import Cell from './Cell';
import { Snake, Coordinates } from './types';
import checkIfFieldInArray from './checkIfFieldInArray';

interface FieldProp {
  fieldWidth: number;
  fieldHeight: number;
  snake: Snake;
  food: Coordinates | null;
}

const Field = ({ fieldWidth, fieldHeight, snake, food }: FieldProp): JSX.Element => {
  return (
    <div
      className="wrapper"
      style={{ gridTemplateColumns: `repeat(${fieldWidth}, 1fr)`, maxWidth: fieldWidth * 30 }}
    >
      {R.range(0, fieldWidth * fieldHeight).map((index) => {
        const y = (index - (index % fieldWidth)) / fieldWidth;
        const x = index % fieldHeight;
        const coordinates = { x, y };
        const isSnake = checkIfFieldInArray(coordinates, snake);
        const isFood = food && food.x === x && food.y === y;
        const type = isSnake ? 'snake' : isFood ? 'food' : 'empty';
        return <Cell key={index} type={type} />;
      })}
    </div>
  );
};

export default Field;
