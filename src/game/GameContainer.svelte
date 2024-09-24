<script lang="ts">
  import GameMap from "../shared/GameMap.svelte";
  import Player from "./Player.svelte";
  import { onMount } from "svelte";

  import type { Game, Tile } from "../types/game";
  import { Triggers } from "../types/event";
  import type { Event } from "../types/event";

  export let gameState: Game;
  export let tileSize: number = 50;
  export let refreshMap: () => void;

  // map arrow key inputs to corresponding position value and player direction changes
  // this is used to update position when moving, and to get space in front of character for actions
  const buttonMap = {
      "ArrowUp": [0, -1, 'up'],
      "ArrowDown": [0, 1, 'down'],
      "ArrowLeft": [-1, 0, 'left'],
      "ArrowRight": [1, 0, 'right'],
    }

  // run setup once initially when game loads
  onMount(refreshMap);

  const getBoardPos = (x: number, y: number): Tile => {
    // return tile at given position if x and y positions are on the map

    if (!!gameState.map.map[y] && !!gameState.map.map[y][x]) { 
      return gameState.map.map[y][x];
    }
  };

  const validMove = (targetTile: Tile, tileEvent: Event): boolean => {
    // takes a target and its active event (if applicable) and checks for passability
    // a tile must be on the map, and event passability status overrides tile passability status

    if (!targetTile) {
      return false;
    } else if (tileEvent) {
      return tileEvent.passable;
    } else {
      return targetTile.passable;
    }
  };

  const updatePos = (key: string) => {
    // get current position of player and update based on arrow key pressed
    // note that this doesnt update the gamestate, only sets the value to further validate
    let x = gameState.position[0] + buttonMap[key][0];
    let y = gameState.position[1] + buttonMap[key][1];

    // update direction character is facing. note that this occurs regardless of whether player moves or not
    gameState.direction = buttonMap[key][2];

    // get potential destination tile
    const targetTile = getBoardPos(x, y);
    // check if event exists on target tile
    // note, this is only for checking tile passibility status. a tile can be passable with an unpassable 
    // event, such as an npc, on it.
    const event: Event = targetTile ? gameState.mapEvents[JSON.stringify(targetTile.position)] : null;
    if (validMove(targetTile, event)) {
      // if target destination is valid, update position in the gamestate.
      gameState.position[0] = x;
      gameState.position[1] = y;
      // return true if a valid move took place and position has changed
      return true;
    }
  };

  const checkEvents = (trigger: Triggers) => {
    // takes method player has potentially activated an event and checks if any have been activated

    // get current tile. for touch events, this is the tile to be checked
    let x = gameState.position[0];
    let y = gameState.position[1];
    if (trigger === Triggers.Action) {
      // if the character pressed the action button, the space checked for events is the one in front of the character
      // buttonMap is looking for an e.code input but we have the resulting direction. direction backfills to get the
      // required key. not sure if this is better or worse than just making another object.
      const direction = Object.keys(buttonMap).find(key => buttonMap[key][2] === gameState.direction);
      x += buttonMap[direction][0];
      y += buttonMap[direction][1];
      // check if character hasnt performed an action on an unreachable map space
      if (!getBoardPos(x, y)) { return; }
    }
    // mapEvents has all active events on current map. if no result for current x/y, no action needs taken
    const event = gameState.mapEvents[JSON.stringify([x, y])];
    // if an event exists, and its trigger matches action taken (or is any,) start event handling
    if (event && (event.trigger === Triggers.Any || event.trigger === trigger)) {
      gameState.eventProcessing = true;
      gameState.activeEvent = event;
    }
  };

  // main gameplay mechanic. listens for presses of arrow keys for movement, or enter key to check objects
  // note that this event listener is ignored while an event is active, but is never removed.
  document.addEventListener('keyup', e => {
    // ignore input if an event is active
    if (gameState.activeEvent) { return };
    // action command for activating events
    if (e.code === "Enter") {
      checkEvents(Triggers.Action);
    // player has pressed an arrow key to trigger movement handling
    } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
      // update position if valid move and check for events triggered by 'touch' on new tile
      if (updatePos(e.code)) {
        // only check for events if the player has moved
        // this is to prevent re-triggering events you're standing on with an invalid move
        checkEvents(Triggers.Touch);
      }
    }
    // refresh game state after every input
    refreshMap();
  });
</script>

<template>
  <div class="board-container">
    <GameMap map={gameState.map.map} {tileSize} />
    <Player position={gameState.position} direction={gameState.direction} {tileSize} />
  </div>
</template>

<style>
  .board-container {
    position: relative;
  }
</style>