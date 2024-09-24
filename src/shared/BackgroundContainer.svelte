<script lang="ts">
  export let img = "";
</script>

<template>
  <div class="bg-container">
    <img src={`assets/bg/${img}`} alt="bg" />
  </div>
</template>

<style>
  .bg-container {
    position: absolute;
    top: 0; right: 0; bottom:0; left: 0;
    z-index: -1;
  }

  .bg-container > img {
    width: 100%;
    height: 100%;
  }
</style>