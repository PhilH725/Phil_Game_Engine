<script lang="ts">
  import Icon from "../shared/Icon.svelte";

  export let brush: {name: string, type: string};
</script>

<template>
  <div class="brush-container">
    {#if ['terrain', 'decoration'].includes(brush.type)}
      <img src={`assets/terrain/${brush.name}.png`} alt="brush" />
    {:else}
      {#key brush}
        <Icon iconName={brush.name} class={brush.name} />
      {/key}
    {/if}
  </div>
</template>

<style>
  .brush-container {
    position: relative;
    width: 60px;
    height: 60px;
  }
  img {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
  }
</style>