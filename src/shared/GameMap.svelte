<script lang="ts">
  import { Tile } from "../types/game";
  import Icon from "./Icon.svelte";

  export let map: Array<Array<Tile>>;
  export let tileSize: number = 50;
  export let selectedTile: Tile = new Tile;
  export let editor: boolean = false;

  const getNpcUrl = (tile: Tile): string => {
    return `assets/sprite/${tile.sprite[0]}/${tile.sprite[0]}-${tile.sprite[1]}.png`;
  };
</script>

<template>
  <div class="map" style="
    grid-template-rows: repeat({map.length}, {tileSize}px);
    grid-template-columns: repeat({map[0]?.length}, {tileSize}px);
    ">
    {#each map as row}
      {#each row as tile}
        <div class="terrain-wrapper" on:click={() => selectedTile = tile}>
          <img src={`assets/terrain/${tile.terrain}.png`} alt="terrain" />
          {#if tile.displayDecoration.length > 0}
            <img src={`assets/terrain/${tile.displayDecoration}.png`} alt="terrain" />
          {/if}
          {#if !tile.passable && editor}
            <Icon iconName={'block'} class="block" />
          {/if}
          {#if tile.events.length > 0 && editor}
            <Icon iconName={'event'} class="event" />
          {/if}
          {#if tile.sprite && tile.sprite[0].length > 0 && !editor}
            <img src={getNpcUrl(tile)} alt="npc" style="
              width: {tileSize *.8}px; 
              height: {tileSize *.8}px;
              top: {tileSize *.1}px;
              left: {tileSize *.1}px;
              "/>
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