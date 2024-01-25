<!--
  @component Comparison of two occupations (electricians and food and beverage workers) to show how the six groups are crowded in or out of each occupation
-->
<script>
  import all_data from "$data/data.json";
  import { get_crowding_label, get_crowding_color } from "$utils/helper";
  import Cell from "./IntroOccupationTableCell.svelte";

  export let r = 17;

  const electricians_data = all_data
    .filter((d) => d.soc === "472100")
    .sort((a, b) => a.race_gender_labels.localeCompare(b.race_gender_labels));

  const food_bev_data = all_data
    .filter((d) => d.soc === "353000")
    .sort((a, b) => a.race_gender_labels.localeCompare(b.race_gender_labels));
</script>

<div class="container">
  <!-- title -->
  <h2 class="title">Occupational Crowding Shows Disparities in Who Works in Quality Jobs</h2>
  <hr />

  <!-- legend -->
  <div class="legend">
    {#each Array(3) as _, i}
      <div class="legend-item">
        <svg width={r} height={r} overflow="visible" aria-label={get_crowding_label(i + 1)}>
          <circle cx={r / 2} cy={r / 2} r={r / 2} fill={get_crowding_color(i + 1)} />
        </svg>
        <span>{get_crowding_label(i + 1)}</span>
      </div>
    {/each}
  </div>

  <!-- table -->
  <div class="table">
    <!-- electricians -->
    <div class="section">
      <div class="label" role="heading" aria-level="4">Electricians</div>
      <div role="list">
        {#each electricians_data as d}
          <div class="row" role="listitem">
            <Cell {r} {d} occ="Electricians" />
          </div>
        {/each}
      </div>
    </div>

    <!-- food and beverage workers -->
    <div class="section">
      <div class="label" role="heading" aria-level="4">Food and Beverage Workers</div>
      <div role="list">
        {#each food_bev_data as d}
          <div class="row" role="listitem">
            <Cell {r} {d} occ="Food and Beverage Workers" />
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    text-align: center;
  }

  .title {
    padding: 0rem 3.5rem;
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-light);
    text-transform: uppercase;
    line-height: 150%;
  }

  hr {
    margin: var(--spacing-6) 0;
  }

  @media (max-width: 36rem) {
    .title {
      padding: 0rem;
    }
  }

  .legend {
    padding-bottom: var(--spacing-5);
    display: flex;
    flex-direction: row;
    justify-content: center;
    column-gap: var(--spacing-4);
    border-bottom: 1px solid #d2d2d2;
    flex-wrap: wrap;
    align-items: center;
    row-gap: var(--spacing-4);
  }

  .legend-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: var(--spacing-2);
    margin-right: var(--spacing-4);
  }

  .table {
    font-size: var(--font-size-xl);
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .label {
    font-weight: var(--font-weight-bold);
    padding: var(--spacing-4);
    padding-left: var(--spacing-8);
    border-bottom: 1px solid #d2d2d2;
    text-align: left;
  }

  .section {
    width: 50%;
  }

  .row {
    display: flex;
    padding: var(--spacing-4);
    padding-left: var(--spacing-8);
    flex-direction: row;
    align-items: center;
    column-gap: var(--spacing-4);
    border-bottom: 1px solid #d2d2d2;
    border-left: 1px solid #d2d2d2;
  }

  .section:first-child .row {
    border-left: none;
  }

  /* mobile view */
  @media (max-width: 41rem) {
    .table {
      flex-direction: column;
    }

    .section {
      width: 100%;
    }

    .section .row {
      border-left: none;
    }

    .section:last-child {
      margin-top: var(--spacing-8);
    }

    .label {
      padding-left: var(--spacing-4);
    }

    .row {
      padding-left: var(--spacing-4);
    }
  }
</style>
