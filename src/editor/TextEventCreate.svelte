<script lang="ts">
  import { Line, Event, Triggers, Choice, Dialogue } from "../types/event";

  export let event: Event;
  event.dialogue = {
    dialogue: []
  };

  let currentLine = new Line;
  let choicesArray = [];

  const addChoice = () => {
    choicesArray = [...choicesArray, new Choice];
  };

  const addTextLine = (key: string): void => {
    event.dialogue[key].push(currentLine);
    const choiceIndex = Object.keys(event.dialogue).length - 1;
    if (choicesArray.length > 0) {
      for (let i = 0; i < choicesArray.length; i++) {
        if (!event.dialogue[`choice${i + 1 + choiceIndex}`]) {
          event.dialogue[`choice${i + 1 + choiceIndex}`] = [];
        }
      };
    }
    
    currentLine = new Line;
    choicesArray = [];
  };

</script>

<template>
  <div class="create-container">
    <div>
      <span>trigger: </span> 
      <select bind:value={event.trigger}>
        {#each Object.keys(Triggers) as trigger}
          <option value={Triggers[trigger]}>{trigger}</option>
        {/each}
      </select>
    </div>
    <div>passable: <input type="checkbox" bind:checked={event.passable} /></div>
    <div>decoration: <input type="text" bind:value={event.decoration}/></div>
    <div>sprite: <input type="text" bind:value={event.sprite[0]}/></div>
    {#each Object.keys(event.dialogue) as dialogueSegment}
      <div>--{dialogueSegment}--</div>
      <div>Name: {currentLine.displayName}</div>
      <div>Avi: {currentLine.avi}</div>
      <div>Line: {currentLine.text}</div>
      <div>Enter text <textarea bind:value={currentLine.text} /></div>
      <div>Enter Name: <input bind:value={currentLine.displayName} /></div>
      <div>Enter Avi: <input bind:value={currentLine.avi} /></div>
      <div>
        Line choice (optional): <button on:click={addChoice}>+</button>
        {#each choicesArray as choice}
          <input type="text" bind:value={choice.label}/>
        {/each}
      </div>
      <button on:click={() => addTextLine(dialogueSegment)}>Add Line</button>
    {/each}
  </div>
</template>

<style>
  .create-container {
    flex: 30;
    overflow-y: scroll;
  }
</style>