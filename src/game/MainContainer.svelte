<script lang="ts">
  import GameContainer from "./GameContainer.svelte";
  import EventProcessor from "../events/EventProcessor.svelte";
  import { gameObject } from "../store";
  import { Game } from "../types/game";
  import { getPriorityEvent } from "../ts/handleEvent";

  const tileSize: number = 50;

  let gameState = new Game();
  // still reviewing necessity of the gameObject, but for now, update from the top whenever its updated by the store
  gameObject.subscribe(res => gameState = res);

  const loadMaps = async () => {
  // load all maps and save the list. set the first map as the games starting point
    const resp = await fetch(`http://localhost:3000/maps`);
    const json = await resp.json();
    gameObject.update( game => {
      game.mapList = json;
      game.map = game.mapList[0];
      return game;
    });
  };
  const loadEvents = async() => {
  // load all events and save them. these are modified in the gamestate, but this original list remains untouched
    const resp = await fetch(`http://localhost:3000/events`);
    const json = await resp.json();
    gameObject.update( game => {
      game.events = json;
      return game;
    });
  };

  const refreshMap = (): void => {
    // function to ensure that the view shown to the player accurately represents the current gamestate
    // most handling of gamestate is done in other processes such as eventProcessor. this function simply
    // gathers all active events on the current map and refreshes what the player sees

    const mapId = gameState.map.id;

    // iterates through all events and groups all on current map by position
    // note that this object doesnt filter for which event is active
    // theoretically you should be able to filter for active at this point, since there should be only one per tile
    // but im gonna leave that check to later for now in case i want to be able to order events later
    const mapEvents = gameState.events.reduce( (acc, c) => {
      // if an event is on another map we dont care about it here
      if (c.mapId !== mapId) { return acc; }

      // keys for this object are stringified versions of the events position (such as [0,0])
      // this key will be unique for our purposes and is easily accessed when using current gamestate
      const key = JSON.stringify(c.position);
      // if position key exists, push subsequent events into it, otherwise create new
      acc[key] ? acc[key].push(c) : acc[key] = [c];
      return acc;
    }, {});
    for (const i of Object.keys(mapEvents)) {
      // iterate through every space with events and find which event is active
      // note that this changes the type of mapEvents values from arrays of events to a single event (or undefined)
      const event = getPriorityEvent(mapEvents[i], gameState);
      mapEvents[i] = event;
    }
    //update gamestate mapevents object, which holds all active events for current map
    gameState.mapEvents = mapEvents;

    // loop for updating map tiles
    for (const [rowIndex, row] of gameState.map.map.entries()) {
      for (const [tileIndex, tile] of row.entries()) {
        // check tile for an event by converting tile position to the mapEvent key
        const position = JSON.stringify([tileIndex,rowIndex]);
        const event = gameState.mapEvents[position];
        if (event) {
          // if an event is on this tile, the events sprite and decoration take precedence
          // displaydecoration is set separately as a tile can have its own decoration that should stay even
          // in the case of an event being present then being removed. a tile cannot have a sprite without an event
          tile.sprite = event.sprite && event.sprite.length > 0 ? event.sprite : "";
          tile.displayDecoration = event.decoration.length > 0 ? event.decoration : tile.decoration;
        } else {
          // if no event, display tiles base images
          tile.sprite = "";
          tile.displayDecoration = tile.decoration;
        }
      };
    };
  };

  loadMaps();
  loadEvents();
</script>

<template>
  {#if gameState.mapList.length > 0 && gameState.events.length > 0}
    <GameContainer {gameState} {tileSize} {refreshMap} />
  {/if}
  {#if gameState.eventProcessing}
    <EventProcessor {gameState} {refreshMap} />
  {/if}
  <div>
    {#each Object.keys(gameState.inventory) as i}
      {i}: {gameState.inventory[i]}
    {/each}
  </div>
</template>

<style>
  
</style>