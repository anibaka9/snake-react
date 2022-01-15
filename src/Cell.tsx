import React from 'react';

interface CellProp extends JSX.IntrinsicAttributes {
  type: 'snake' | 'food' | 'empty';
}

const Cell = ({ type }: CellProp): JSX.Element => {
  return <div className={`field ${type}`} />;
};

export default Cell;
