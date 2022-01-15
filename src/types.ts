export type Coodinates = { x: number; y: number };

export type Snake = Coodinates[];

export type Food = Coodinates[];

export type Direction = '+x' | '-x' | '+y' | '-y';

export type GameStates = 'ready' | 'running' | 'loose';
