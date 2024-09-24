<script lang="ts">
  import type { Line } from "../types/event";

  export let width: string = "800px";
  export let height: string = "168px";
  export let line: Line;
  export let choice = [];
  export let choiceIndex: number = 0;

  const { displayName, avi, text} = line;
</script>

<template>
  <div class="textbox-container">
    {#if choice.length > 0}
      <div class="choicebox">
        {#each choice as option, index}
        <p class="{choiceIndex === index ? 'active': ''}">{option.label}</p>
        {/each}
      </div>
    {/if}
    <div class="textbox {displayName.length > 0 ? "" : 'tx-small'}" style="width: {width}; height: {height}">
      {#if displayName.length > 0}
        <div class="avi-container">
          <img src={`assets/avi/${avi.split('-')[0]}/${avi}.png`} alt="avi" />
        </div>
        <div class="name-container">{displayName}</div>
      {/if}
      <p class="main-text">{text}</p>
    </div>
  </div>
</template>

<style>
  .textbox-container {
    position: absolute;
    left: 0; right: 0; bottom: 24px;
    display: flex;
    justify-content: center;
    border: 1px solid green;
  }
  .choicebox {
    position: absolute;
    right: 0;
    bottom: 200px;
    width: 120px;
    border: 1px solid black;
    background: #e4e4e4;
  }
  .choicebox .active {
    color: red;
    background: slateblue;
  }
  .textbox {
    font-size: 20px;
    background-color: rgba(0,0,0,.6);
    border: 1px solid white;
    display: grid;
    grid-column-gap: 12px;
    grid-template-areas: 'name one' 'avi two' 'avi three' 'avi four';
    grid-template-columns: 128px auto;
    grid-template-rows: repeat(4, 1fr);
  }
  .tx-small {
    grid-template-areas: 'one' 'two' 'three' 'four';
    grid-template-columns: auto;
    padding-left: 36px;
    box-sizing: border-box;
  }
  .textbox p {
    align-self: center;
  }
  .avi-container {
    border-right: 1px solid white;
    border-top: 1px solid white;
    grid-area: avi;
    width: 128px;
    height: 128px;
  }
  .avi-container img {
    height: 100%;
    width: 100%;
  }
  .textbox p {
    color: white;
    margin: 0;
  }

  .name-container {
    grid-area: name;
    /* border: 1px solid purple; */
    color: white;
    padding: 4px 0 0 4px;
    /* font-size: 20px;
    background-color: rgba(0,0,0,1);
    border: 1px solid white;
    color: white;
    position: absolute;
    top: -18px;
    min-width: 100px;
    padding: 8px;
    text-align: center;
    border: 1px solid blue; */
  }
</style>