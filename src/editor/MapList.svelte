<script lang="ts">
  import GameMap from '../shared/GameMap.svelte';
  import type { Map } from '../types/game';

  export let selectMap: (map: Map) => void;

  let maps: Map[] = [];
  const loadMaps = async () => {
    const resp = await fetch(`http://localhost:3000/maps`);
    const json = await resp.json();
    maps = json;
  };
  loadMaps();
</script>

<template>
  <div class="item-container">
  {#each maps as map}
    <div class="map-item" on:click={() => selectMap(map)}>
      <div class="text-container">{map.id}</div>
      <div class="map-container">
        <GameMap tileSize={16} map={map.map} />
      </div>
    </div>
  {/each}
  </div>
</template>

<style>
  .item-container {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 3;
  }
  .map-item {
    height: 140px;
    display: flex;
    border: 1px solid royalblue;
  }
  .text-container {
    flex: 1;
  }
  .map-container {
    flex: 2;
    overflow: hidden;
    padding: 4px;
  }
</style>