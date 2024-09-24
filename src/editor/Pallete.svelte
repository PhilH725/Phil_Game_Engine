<script lang="ts">
import Icon from "../shared/Icon.svelte";


  export let brush;
  const terrains = ['grass', 'black', 'cobble', 'woodfloor', 'woodwall', 'woodwallend', 'woodroof', 'tile', 'stairs',
    'royal-b', 'royal-t', 'royal-l', 'royal-r', 'royal-cbl', 'royal-cbr', 'royal-ctl', 'royal-ctr', 'royal-mid'];
  const decos = ['door', 'gold', 'portal', 'flower', 'throne-t', 'throne-b'];
  // const actions = [{name: 'event', type: 'event'}, {name: 'block', type: 'passable'}];
  const actions = ['event', 'block'];

  const updateBrush = (name, type) => {
    brush["name"] = name;
    brush["type"] = type;
  }
</script>

<template>
  <div class="pallete-container">
    <div class="tiles-container">
      {#each terrains as terrain}
        <div class="tile-wrapper" on:click={() => updateBrush(terrain, 'terrain')}>
          <img src={`assets/terrain/${terrain}.png`} alt="terrain" />
        </div>
      {/each}
    </div>
    <div class="tiles-container">
      {#each decos as deco}
        <div class="tile-wrapper" on:click={() => updateBrush(deco, 'decoration')}>
          <img src={`assets/terrain/${deco}.png`} alt="decoration" />
        </div>
      {/each}
    </div>
    <div class="tiles-container">
      {#each actions as action}
        <div class="tile-wrapper" on:click={() => updateBrush(action, action)}>
          <Icon iconName={action} class={action} />
        </div>
      {/each}
    </div>
  </div>
</template>

<style>
  .pallete-container {
    grid-area: pallete;
    display: flex;
    justify-content: space-between;

    border: 1px solid darkslateblue;
  }
  .tiles-container {
    display: flex;
    flex-direction: column;
    max-height: 400px;
    overflow-y: auto;
  }
  .tile-wrapper {
    position: relative;
    width: 48px;
    height: 48px;
    border: 1px solid black;
  }
  img {
    height: 100%;
    width: 100%;
  }
</style>