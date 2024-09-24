<script lang="ts">
  import Router from 'svelte-spa-router';
  import routes from './routes';
</script>

<main>
  <Router {routes} />
</main>

<style>
  main {
    overflow: hidden;
    display: flex;
  }
</style>