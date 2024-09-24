import type { Event } from "./event";
import { Inventory } from "./inventory";
import { Reqs } from "./reqs";

export enum Directions {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right"
}

export class Tile {
  terrain: string = "grass";
  passable: boolean = true;
  events: number[] = [];
  position: [number, number] = [0,0];
  decoration: string = "";
  displayDecoration: string = "";
  sprite: string = "";
};

export class Map {
  id: number;
  map: Array<Array<Tile>>;
};

export class Game {
  mapList: Map[] = [];
  map: Map = new Map;
  position: [number, number] = [0,0];
  direction: Directions = Directions.Down;
  health: number = 100;
  events: Event[] = [];
  mapEvents: any;
  activeEvent: any;
  reqs: Reqs = new Reqs;
  eventProcessing: boolean = false;
  inventory: Inventory = new Inventory;
};