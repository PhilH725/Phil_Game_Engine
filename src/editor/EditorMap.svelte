<script lang="ts">
  import type { Tile } from "../types/game";
  import Icon from "../shared/Icon.svelte";
  import type { Event } from "../types/event";

  export let map: Array<Array<Tile>>;
  export let tileSize: number = 50;
  // export let selectedTile: Tile = new Tile;
  export let mapEvents: Object;
  export let updateMap;

  const hasEvent = (x, y) => {
    return mapEvents[JSON.stringify([x,y])];
  }
</script>

<template>
  <div class="map" style="
    grid-template-rows: repeat({map.length}, {tileSize}px);
    grid-template-columns: repeat({map[0]?.length}, {tileSize}px);
    ">
    {#each map as row, rowIndex}
      {#each row as tile, tileIndex}
        <div class="terrain-wrapper" on:click={() => updateMap(tile.position)}>
          <img src={`assets/terrain/${tile.terrain}.png`} alt="terrain" />
          {#if tile.decoration.length > 0}
            <img src={`assets/terrain/${tile.decoration}.png`} alt="terrain" />
          {/if}
          {#if !tile.passable}
            <Icon iconName={'block'} class="block" />
          {/if}
          {#if hasEvent(tileIndex, rowIndex)}
            <Icon iconName={'event'} class="event" />
          {/if}
        </div>
      {/each}
    {/each}
  </div>
</template>

<style>
  .map {
    display: grid;
  }
  .map div {
    border: 1px solid black;
  }
  .terrain-wrapper {
    position: relative;
  }
  img {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
  }
</style>