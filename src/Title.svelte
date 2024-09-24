<script lang="ts">
  import { push } from 'svelte-spa-router';
</script>

<template>
  <div class="title-container">
    <div class="menu-container">
      <div class="option" on:click={()=> push('/game')}>
        <span>Play Game</span>
      </div>
      <div class="option" on:click={()=> push('/editor')}>
        <span>Edit Maps</span>
      </div>
    </div>
  </div>
</template>

<style>
  .title-container {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .menu-container {
    width: 400px;
    height: 400px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .option {
    font-size: 20px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .option:hover {
    text-decoration: underline;
    border: 1px solid tomato;
  }
</style>