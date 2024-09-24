<script lang="ts">
  import Textbox from "../shared/Textbox.svelte";
  import { gameObject } from "../store";
  import { handleEvent } from "../ts/handleEvent";
  import type { Event, Line } from '../types/event';
  import type { Game } from "../types/game";

  export let dialogue;
  export let endEvent;

  let currentDialogue = dialogue.dialogue;
  let sceneProg = 0;
  let line: Line = currentDialogue[sceneProg];
  let choice = [];
  let choiceIndex: number = 0;
  let gameUpdates = [];

  // line.update && line.update.length > 0 && line.update.forEach(l => gameUpdates.push(l));
  // if (line.update) {
  //   // handle case of update event taking place in opening text box
  //   gameUpdates.push(line.update);
  // }

  const checkGameUpdates = (): void => {
    line.update && line.update.length > 0 && line.update.forEach(l => gameUpdates.push(l)); 
  }

  checkGameUpdates();

  const advanceScene = (e) => {
    const key = e.key;
    if (choice.length === 0) {
      sceneProg += 1;
      if (currentDialogue[sceneProg]) {
        line = currentDialogue[sceneProg];
        checkGameUpdates();
        choice = line.choice;
      } else {
        document.removeEventListener('keyup', advanceScene);
        endEvent(gameUpdates);
      }
    } else {
      if (key === 'ArrowUp') {
        choiceIndex = choice[choiceIndex - 1] ? choiceIndex - 1 : choice.length - 1;
      } else if (key === 'ArrowDown') {
        choiceIndex = choice[choiceIndex + 1] ? choiceIndex + 1 : 0;
      } else if (key === 'Enter') {
        // right now this only works for chaining into other text events. thats fine for now, 
        // but if i want to expand functionality later it will require reworking this some
        const selection = choice[choiceIndex]['result'];
        currentDialogue = dialogue[selection];
        console.log(currentDialogue, '22222')
        if (currentDialogue.length === 0) {
          endEvent(gameUpdates);
          return;
        }
        sceneProg = 0;
        choiceIndex = 0;
        choice = [];
        line = currentDialogue[sceneProg];
        checkGameUpdates();
      }
    }
  };
  
  document.addEventListener('keyup', advanceScene);
</script>

<template>
  <div class="overlay">
    {#key sceneProg}
      <Textbox {line} {choice} {choiceIndex} />
    {/key}
  </div>
</template>

<style>
  .overlay {
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    background: rgba(0,0,0,0);
  }
</style>