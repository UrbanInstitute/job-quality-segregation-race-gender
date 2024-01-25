<!--
  @component List of indicators that are used in the job quality score
-->
<script>
  import indicator_names from "$data/indicator-names.json";
  $: clientWidth = 0;
</script>

<div bind:clientWidth class="container">
  <!-- title -->
  <h2 class="title">Job Quality Indicators</h2>

  <hr />

  <!-- indicator table -->
  <div class="table" role="list">
    <!-- on non-mobile, 4 rows of 3 cells each -->
    {#if clientWidth > 450}
      <!-- four rows -->
      {#each Array(4) as _, i}
        <div class="row">
          <!-- three cells -->
          {#each Array(3) as _, j}
            {@const num = i * 3 + j}
            {#if num < 11}
              <div class="cell" role="listitem">{indicator_names[num].title}</div>
            {:else}
              <div class="cell" />
            {/if}
          {/each}
        </div>
      {/each}
      <!-- on mobile, one column -->
    {:else}
      {#each Array(11) as _, i}
        <div class="row">
          <div class="cell" style:width="100%" role="listitem" style:padding-left="1.5rem">
            {indicator_names[i].title}
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  .container {
    text-align: left;
    font-size: var(--font-size-xl);
    color: #353535;
    padding: var(--spacing-12) 0;
  }

  .title {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-light);
    text-transform: uppercase;
    line-height: 150%;
    text-align: center;
    padding-bottom: 1rem;
  }

  .table {
    padding: 0 0 var(--spacing-8) 0;
  }

  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: var(--spacing-4);
    padding: var(--spacing-2) 0;
  }

  .row:nth-child(even) {
    background-color: var(--color-gray-shade-lightest);
  }

  .cell {
    width: 28%;
    padding: 0 var(--spacing-1) 0 var(--spacing-4);
  }
</style>
