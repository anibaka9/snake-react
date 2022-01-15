import { Coodinates } from './types';

const checkIfFieldInArray = (field: Coodinates, array: Coodinates[]): boolean =>
  array.some((el) => Boolean(el.x === field.x && el.y === field.y));

export default checkIfFieldInArray;
