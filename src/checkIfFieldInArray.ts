import { Coordinates } from './types';

const checkIfFieldInArray = (field: Coordinates, array: Coordinates[]): boolean =>
  array.some((el) => Boolean(el.x === field.x && el.y === field.y));

export default checkIfFieldInArray;
