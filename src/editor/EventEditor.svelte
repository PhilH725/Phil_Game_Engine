<script lang="ts">
  import { Event, EventTypes } from "../types/event";
  import TextEventCreate from "./TextEventCreate.svelte";
  import ExitEventCreate from "./ExitEventCreate.svelte";

  export let mapId: number;
  export let eventMode = true;
  export let position: [number, number];
  export let updateMapEvent: (event: any) => void;

  // const eventTypes = ['Exit', 'Text'];
  // let eventType = EventTypes.Exit;

  let event = new Event;
  event.mapId = mapId;
  event.position = position;
  // $: event.type = eventType;
</script>

<template>
  <div class="overlay">
    <div class="event-modal">
      <div class="type-row">
        <select bind:value={event.type}>
          {#each Object.keys(EventTypes) as type}
            <option value={EventTypes[type]}>{type}</option>
          {/each}
        </select>
        <button on:click={() => eventMode = false}>X</button>
      </div>
      {#if event.type === EventTypes.Exit}
        <ExitEventCreate bind:event />
      {:else if event.type === EventTypes.Text}
        <TextEventCreate bind:event />
      {/if}
      <div class="save-row">
        <button on:click={() => updateMapEvent(event)}>Save Event</button>
      </div>
    </div>
  </div>
</template>

<style>
  .overlay {
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,.3);
  }
  .event-modal {
    width: 80%;
    background: lightcoral;
    height: 500px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
  }
  .type-row {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .type-row select {
    margin: 0;
    width: 150px;
  }
  .save-row {
    display: flex;
    align-items: center;
    flex: 1;
  }
  .save-row button {
    margin: 0;
  }
</style>