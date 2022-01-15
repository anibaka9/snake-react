import React from 'react';
import * as R from 'ramda';
import Cell from './Cell';
import { Snake, Coodinates } from './types';
import checkIfFieldInArray from './checkIfFieldInArray';

interface FieldProp {
  fieldWidth: number;
  fieldHeight: number;
  snake: Snake;
  food: Coodinates | null;
}

const Field = ({ fieldWidth, fieldHeight, snake, food }: FieldProp): JSX.Element => {
  return (
    <div className="wrapper">
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
