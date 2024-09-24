
import { writable } from 'svelte/store';
import { Game } from './types/game';

export const gamePhase = writable("start");

export const gameObject = writable(new Game);