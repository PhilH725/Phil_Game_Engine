import { Directions } from "./game";

export enum Triggers {
  Any = 'any',
  Action = 'action',
  Touch = 'touch',
}

export enum EventTypes {
  Exit = "exit",
  Text = "text"
}

export class Choice {
  label: string;
  result: string;
}

export class Line {
  displayName: string;
  avi: string;
  text: string;
  choice: Choice[] = [];

  update?: any[];
};

export class Dialogue {
  dialogue: Line[] = [];

  choice1?: Line[];
  choice2?: Line[];
  choice3?: Line[];
  choice4?: Line[];
  choice5?: Line[];
  choice6?: Line[];
}

export class Event {
  id: number;
  type: EventTypes;
  mapId: number = 0;
  position: [number, number] = [0,0];
  trigger: Triggers = Triggers.Any;
  passable: boolean = false;
  sprite: [string, Directions] = ["", Directions.Down];
  decoration: string = "";
  condition?: any[];

  destinationMap?: number;
  destinationPosition?: [number, number] = [0,0];

  dialogue?: Dialogue;
}
