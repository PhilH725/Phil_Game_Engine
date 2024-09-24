import { gameObject } from "../store";
import { EventTypes, Triggers } from "../types/event";
import type { Game } from "../types/game";

export const handleEvent = (gameState: Game, event: any, action: Triggers = Triggers.Any) => {
  // events can be activated with the action button (triggers the space in front of you) or by touch, walking
  // onto the event space. for now those are the only options, but could be more in the future.
  console.log('handle event:', event)
  // 'any' as a trigger skips further check to see if event should cancel
  // otherwise, action taken must trigger action requirement for event
  if (event.trigger !== Triggers.Any && event.trigger !== action) { return; }

  const exitEvent = () => {
    
    gameObject.update( game => {
      const map = game.mapList.find( m => m.id === event.destMap);
      game.map = map;
      game.position[0] = event.destPos[0];
      game.position[1] = event.destPos[1];
      return game;
    } );
  };

  const textEvent = () => {
    gameObject.update( game => {
      // currently typed as an array for eventual handling of multiple events at once, but
      // handling here will need updated for that capability.
      game.activeEvent = event;
      return game;
    });
  };

  const npcEvent = () => {
    // for now, these events can only trigger chained events. can add more functionality in the future
    const chainedEvent = gameState.events.find(e => e.id === event.chain);
    handleEvent(gameState, chainedEvent)
  }

  const incrementEvent = () => {
    parseIncrement(gameState, event.target)
  }

  // deprecated, remove later
  // if (event.type === EventTypes.Exit) { exitEvent(); }
  // if (event.type === EventTypes.Text) { textEvent(); }
}

export const parseIncrement = (game: Game, incDetails: any[]) => {
  const type = incDetails[0];
  const target = incDetails[1];
  const value = incDetails[2];

  if (type === "reqs") {
    game.reqs[target] = value;
  }
}

export const parseEventConditions = (game: Game, conditions: any[]) => {
  //experimental way to handle event conditions as i move forward.

  // if an event is always triggered, it has no conditions and should always return true
  if (!conditions) {
    return true;
  }
  const type = conditions[0];

  if (type === 'health') {
    const modifier = conditions[1];
    const value = conditions[2];
    if (modifier === '<=') {
      return game.health <= value;
    } else if (modifier === '>=') {
      return game.health >= value;
    } else if (modifier === '<') {
      return game.health < value;
    } else if (modifier === '>') {
      return game.health > value;
    }
  } else if (type === 'reqs') {
    const target = conditions[1];
    const modifier = conditions[2];
    const value = conditions[3];

    if (modifier === '=') {
      return game.reqs[target] === value;
    }
  } else if (type === 'inventory') {
    const target = conditions[1];
    const modifier = conditions[2];
    const value = conditions[3];

    if (modifier === '<=') {
      return game.inventory[target] <= value;
    } else if (modifier === '>=') {
      return game.inventory[target] >= value;
    } else if (modifier === '<') {
      return game.inventory[target] < value;
    } else if (modifier === '>') {
      return game.inventory[target] > value;
    }

  } else if (type === 'self') {
    const value = conditions[1];
    return value;
  }
}

export const getPriorityEvent = (events, game: Game) => {
  return events.find(f => parseEventConditions(game, f.condition));
};
