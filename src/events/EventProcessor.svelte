<script lang="ts">
  import TextModal from './TextModal.svelte';
  import type { Game } from '../types/game';
  import type { Event, EventTypes } from '../types/event';

  export let gameState: Game;
  export let refreshMap: () => void;
  
  const event: Event = gameState.activeEvent;
  const type: EventTypes = event.type;

  let eventActive: boolean = true;

  const handleExitEvent = () => {
    const map = gameState.mapList.find( m => m.id === event.destinationMap);
    gameState.map = map;
    gameState.position[0] = event.destinationPosition[0];
    gameState.position[1] = event.destinationPosition[1];
  };

  const updateStatus = (updateDetails: any[]) => {
    // parses increment arrays to find how to update status
    const type = updateDetails[0];
    const target = updateDetails[1];
    const value = updateDetails[2];

    if (type === "reqs") {
      gameState.reqs[target] = value;
    } else if (type === "self") {
      event.condition[1] = target;
    } else if (type === "inventory") {
      gameState.inventory[target] += value;
    }
  }

  const endEvent = (gameUpdates: any[] = []) => {
    // upon ending an event, gamestatus is updated and eventProcessing is set back to false

    // gameupdates are built up in other handling methods, then parsed here
    if (gameUpdates.length > 0) {
      gameUpdates.forEach(g => updateStatus(g));
    }

    gameState.activeEvent = undefined;
    gameState.eventProcessing = false;
    eventActive = false;
    // after gamestatus has been updated, refresh the map and return to main game screen
    refreshMap();
  };

  const processEvent = () => {
    // breaks events up by type and calls the proper handle functions

    // handling for text events is taken care of elsewhere, endevent is called from there so no further action required
    if (type === 'text') { 
      return;
    } else if (type === 'exit') {
      handleExitEvent();
      endEvent();
    }
  };

  // initiate event handling
  processEvent();
</script>

<template>
  {#if eventActive && type === "text"}
    <TextModal dialogue={event.dialogue} {endEvent} />
  {/if}
</template>

<style>
  
</style>