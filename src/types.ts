export type Coordinates = { x: number; y: number };

export type Snake = Coordinates[];

export type Food = Coordinates[];

export type Direction = '+x' | '-x' | '+y' | '-y';

export type GameStates = 'ready' | 'running' | 'lost';

export interface GameSettings {
  fieldWidth: number;
  fieldHeight: number;
  initialSnake: Snake;
  initialSpeed: number;
  initialDirection: Direction;
  maxSpeed: number;
  speedIncrement: number;
}
