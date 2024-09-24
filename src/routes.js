import MainContainer from './game/MainContainer.svelte';
import EditorContainer from './editor/EditorContainer.svelte';
import Editor from './editor/Editor.svelte';
import Title from './Title.svelte';

export default {
  '/editor/map/:id?' : Editor,
  '/editor' : EditorContainer,
  '/game': MainContainer,
  '/' : Title,
}