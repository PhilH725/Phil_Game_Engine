<script lang="ts">
  import MapList from "./MapList.svelte";
  import type { Map } from "../types/game";
  import { push } from 'svelte-spa-router'

  const selectMap = (map: Map): void => {
    push(`/editor/map/${map.id}`);
  };
</script>

<template>
  <div>
    Select a map to edit
  </div>
  <div class="maplist-container">
    <MapList {selectMap} />
  </div>
  <div>
    or <button on:click={()=> push('/editor/map')}>Create New Map</button>
  </div>
</template>

<style>
  .maplist-container {
    overflow-y: scroll;
    max-height: 600px;
    width: 300px;
  }
</style>