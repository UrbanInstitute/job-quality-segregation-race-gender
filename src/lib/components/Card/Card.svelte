<!--
  @component Parent card element that houses all child content (text, radial viz, table)
-->
<script>
  import { setContext } from "svelte";
  export let group;
  setContext("group", group);
</script>

<div class="card-container bordered">
  <slot />
</div>

<style>
  .card-container {
    height: fit-content;
    width: fit-content;
    max-width: 38rem;
    padding: var(--spacing-4) var(--spacing-4) var(--spacing-8) var(--spacing-4);
    margin: auto;
  }
</style>
