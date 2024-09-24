<script lang="ts">
  export let width: number;
  export let height: number;
  export let createTiles: () => void;
</script>

<template>
  <div class="options-container">
    Tiles: 
    <input type="number" bind:value={width} /> X 
    <input type="number" bind:value={height} />
    <button on:click={createTiles}>Generate</button>
  </div>
</template>

<style>
  .options-container {
    grid-area: options;
  }
</style>