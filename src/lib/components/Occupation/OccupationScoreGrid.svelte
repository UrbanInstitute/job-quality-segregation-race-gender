<!--
  @component Grid of all indicators for a given occupation
-->
<script>
  import OccupationScore from "./OccupationScore.svelte";
  import indicator_names from "$data/indicator-names.json";
  import { selected_occupation_data } from "$stores/selected_occ_ind";

  $: scores = indicator_names.map((d) => ({
    title: d.title,
    // @ts-ignore
    score: $selected_occupation_data?.[d.field],
  }));
</script>

<div>
  <div class="grid">
    {#each scores as { title, score }}
      <div class="grid-item">
        <OccupationScore {title} {score} />
      </div>
    {/each}
  </div>

  <div class="occupation-header-note">
    Job-quality scores equal the total number of indicators where each indicator value betters the
    average for all occupations.
  </div>
</div>

<style>
  /* grid borders adapted from this tutorial: https://geary.co/internal-borders-css-grid/ */
  .grid {
    --gap: var(--spacing-8);
    --line-offset: calc(var(--gap) / 2);
    --line-thickness: 1px;
    --line-color: var(--color-gray-shade-light);

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    overflow: hidden;
    gap: var(--gap);
  }

  .grid-item {
    position: relative;
  }

  .grid-item::before,
  .grid-item::after {
    content: "";
    position: absolute;
    background-color: var(--line-color);
    z-index: 1;
  }

  .grid-item::after {
    inline-size: 100vw;
    block-size: var(--line-thickness);
    inset-inline-start: 0;
    inset-block-start: calc(var(--line-offset) * -1);
  }

  /* smaller cell size on mobile */
  @media (max-width: 36rem) {
    .grid {
      grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
    }
  }

  .occupation-header-note {
    padding-top: var(--spacing-6);
    font-style: italic;
    color: var(--color-gray-shade-darkest);
  }
</style>
