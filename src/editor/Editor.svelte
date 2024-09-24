<script lang="ts">
  import Pallete from './Pallete.svelte';
  import EventEditor from './EventEditor.svelte';
  import Options from './Options.svelte';
  import Brush from './Brush.svelte';
  import { pop } from 'svelte-spa-router'
  import { Tile } from '../types/game';
  import type { Event } from '../types/event';
import EditorMap from './EditorMap.svelte';
  
  export let params;

  let editing = !!params.id;
  const mapId = parseInt(params.id);
  let map = []; // note that in this file, map refers to the eventual map.map array, not the full map object
  let mapEvents: Object;
  let height = 0;
  let width = 0;
  let selectedPosition: [number, number];
  let eventMode = false;
  let selectedTile = new Tile;
  let brush = {
    name: "grass",
    type: "terrain"
  };
  let eventsLoaded: boolean = false;

  const getMapEvents = (allEvents: Event[]) => {
    return allEvents.reduce( (acc, c) => {
      if (c.mapId !== mapId) { return acc; }

      const key = JSON.stringify(c.position);
      acc[key] ? acc[key].push(c) : acc[key] = [c];
      console.log(acc, '3333')
      return acc;
    }, {});
  }

  const loadMap = async () => {
    const resp = await fetch(`http://localhost:3000/maps/${params.id}`);
    const json = await resp.json();
    map = json.map;
    height = map.length;
    width = map[0].length;
  };
  const loadEvents = async () => {
    const resp = await fetch(`http://localhost:3000/events`);
    const json = await resp.json();
    const allEvents = json;
    mapEvents = getMapEvents(allEvents);
    eventsLoaded = true;
  };
  if (editing) { 
    loadMap();
  };
  loadEvents();

  const createTiles = () => {
    let newMap = [];
    //instantiate rows based on given height of map
    for (let i = 0; i < height; i++) {
      let row = [];
      // create tiles for each row based on map width
      for (let j = 0; j < width; j++) {
        //use tile at current location if exists in current map, otherwise create new
        let tile = map[i] && map[i][j] ? map[i][j] : {...new Tile, position: [j, i]};
        row.push(tile);
      }
      newMap.push(row);
    }
    map = newMap;
  }

  const updateMap = (position: [number, number]) => {
    selectedPosition = position;
    const x = position[0];
    const y = position[1];
    if (brush.type === "terrain") {
      map[y][x].terrain = brush.name;
    } else if (brush.type === "decoration") {
      map[y][x].decoration = brush.name;
    } else if (brush.name === "block") {
      map[y][x].passable = !map[y][x].passable;
    } else if (brush.name === "event") {
      eventMode = true;
    }
  }

  const updateMapEvent = (newEvent) => {
    console.log(newEvent, '2222')
    const postEvent = async () => {
      const response = await fetch(`http://localhost:3000/events`, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent)
      });
      return response.json();
    };
    postEvent().then(data => {
      console.log('saved', data);
    });
    // const x = selectedTile.position[0];
    // const y = selectedTile.position[1];
    // map[y][x].events.push(newEvent);
    // force visual refresh of map component
    // map[y][x].events = map[y][x].events;
    // eventMode = false;
  }

  const saveMap = () => {
    const postData = async () => {
      const response = await fetch(`http://localhost:3000/maps/${editing ? params.id : ''}`, {
        method: editing ? 'PATCH' : 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          map: map
        })
      });
      return response.json();
    }
    postData().then(data => {
      console.log('saved', data);
      pop();
    })
  }
</script>

<template>
  <div class="edit-container">
    <Options bind:height bind:width {createTiles} />
    <Pallete bind:brush />
    {#if (!editing || map.length > 0) && eventsLoaded}
      <EditorMap {map} {mapEvents} {updateMap} />
    {/if}
    <button class="save-button" on:click={saveMap}>Save</button>
    <Brush {brush} />
  </div>
  {#if eventMode}
    <EventEditor {mapId} position={selectedPosition} {updateMapEvent} bind:eventMode />
  {/if}
</template>

<style>
  .edit-container {
    display: grid;
    grid-template-areas: 'options options' 'map pallete';
    grid-template-rows: 1fr 9fr;
    grid-template-columns: auto 160px;
    width: 100%;
    border: 1px solid tomato;
  }
  .save-button {
    width: 120px;
  }
</style>