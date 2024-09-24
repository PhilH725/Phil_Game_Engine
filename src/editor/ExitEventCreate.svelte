<script lang="ts">
  import { Event, Triggers } from "../types/event";
  import type { Tile } from "../types/game";
  import type { Map } from "../types/game";
  import GameMap from "../shared/GameMap.svelte";
  import MapList from "./MapList.svelte";

  export let event: Event

  let selectedMap: Map;
  let exitDestinationTile: Tile;

  const selectMap = (map: Map) => {
    selectedMap = map;
    event.destinationMap = selectedMap.id;
  };

  $: {
    if (event && exitDestinationTile) {
      event.destinationPosition = exitDestinationTile.position;
    }
  };
</script>

<template>
  
  <div class="create-container">
    <div class="text-entry">
      <div>destMap: {selectedMap?.id}</div>
      <div>destPos: {exitDestinationTile?.position}</div>
      <div>
        <span>trigger: </span> 
        <select bind:value={event.trigger}>
          {#each Object.keys(Triggers) as t}
            <option value={Triggers[t]}>{t}</option>
          {/each}
        </select>
      </div>
      <div>passable: <input type="checkbox" bind:checked={event.passable} /></div>
      <div>decoration: <input type="text" bind:value={event.decoration}/></div>
      <div>sprite: <input type="text" bind:value={event.sprite[0]}/></div>
    </div>
    <div class="map-list">
      {#if !selectedMap || !selectedMap.id}
        <MapList {selectMap} />
      {:else}
        <GameMap map={selectedMap.map} tileSize={35} bind:selectedTile={exitDestinationTile} />
      {/if}
    </div>
  </div>
  
  
</template>

<style>
  .create-container {
    flex: 30;
    display: flex;
    overflow-y: scroll;
  }
  .text-entry {
    flex: 1;
  }
  .map-list {
    flex: 1;
    overflow-y: scroll;
  }
</style>