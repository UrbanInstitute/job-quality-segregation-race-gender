<!--
  @component Title for the occupation section
-->
<script>
  import { textfit } from "$utils/text-fit-action";
  import { selected_occupation_data } from "$stores/selected_occ_ind";

  let parent;
  let clientWidth;
</script>

<!-- unclear why this section does not need a firefox checker like in CardHeader.svelte -->
<div style:height={clientWidth < 400 ? "4rem" : "3rem"} bind:clientWidth bind:this={parent}>
  <h3
    use:textfit={{
      parent,
      mode: "multi",
      min: 16,
      max: 48,
      update: $selected_occupation_data?.name,
      autoResize: true,
    }}
  >
    {$selected_occupation_data?.name}
  </h3>
</div>

<style>
  h3 {
    color: var(--color-black);
    font-family: var(--font-family-sans);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-snug);
    text-transform: none;
  }
</style>
