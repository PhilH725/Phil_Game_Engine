<script lang="ts">
  import { Directions } from '../types/game';

  export let position: [number, number] = [0,0];
  export let direction: Directions = Directions.Down;
  export let tileSize = 50;

  // absolutely position character image sprite based on the current game position.
  // every unit of position increases the left or top by 'tilesize', so character stays in middle of correct tile
</script>

<template>
  <div class="player" style="
    left: {position[0] * tileSize + tileSize * .1}px;
    top: {position[1] * tileSize + tileSize * .1}px;
    width: {tileSize *.8}px;
    height: {tileSize *.8}px;
  ">
    <img src={`assets/sprite/mc/mc-${direction}.png`} alt="player" />
  </div>
</template>

<style>
  .player {
    position: absolute;
  }
  .player img {
    height: 100%;
    width: 100%;
  }
</style>