<!--
  @component Card table displaying the percent breakdown for the group's crowding designation across below/above-average qualtiy jobs
-->
<script>
  // import utils
  import { getContext } from "svelte";
  let group = getContext("group");
  import { format } from "d3-format";

  // import data and stores
  import group_count_data from "$data/group-count-data.json";
  import { group_selected_occupation_data } from "$stores/selected_occ_ind";

  // declare client width for table
  $: clientWidth = 0;

  // format percentage based on d3-format
  const format_percent = format(".01%");

  // get selected occupation data for the group based on the group
  $: filtered_data = $group_selected_occupation_data.find((d) => d.race_gender_labels === group);

  // filter the group-count-data.json to the selected group
  let d = group_count_data.filter((d) => d.race_gender_labels === group);

  // init sums of the below/above count
  let sums = [0, 0];

  // iterate through to sum
  d.forEach((e) => {
    // if crowding_label is a property, add to sums
    if (e.hasOwnProperty("crowding_label")) {
      sums[0] = sums[0] + e.below;
      sums[1] = sums[1] + e.above;
    }
  });

  // lay out table data
  let tableData = [
    [
      `Crowding Designation`,
      `Below Average Quality (n = ${sums[0]})`,
      `Above Average Quality (n = ${sums[1]})`,
    ],
    ["Crowded out", format_percent(d[1].below / sums[0]), format_percent(d[1].above / sums[1])],
    ["Proportional", format_percent(d[2].below / sums[0]), format_percent(d[2].above / sums[1])],
    ["Crowded in", format_percent(d[0].below / sums[0]), format_percent(d[0].above / sums[1])],
  ];
</script>

<div bind:clientWidth>
  <!-- if non-mobile -->
  {#if clientWidth > 380}
    <table>
      <caption>Crowding across All Occupations</caption>
      <!-- header row -->
      <thead>
        <tr>
          {#each tableData[0] as header, i}
            <th style:text-align={i === 0 ? "left" : "center"} scope="col">{header}</th>
          {/each}
        </tr>
      </thead>
      <!-- body -->
      <tbody>
        {#each tableData.slice(1) as row, i}
          <!-- highlight if current row matches filtered data's crowding designation -->
          <tr class:highlight={(i + 1).toString() === filtered_data?.crowd_desig_chr}>
            {#each row as cell}
              <td>{cell}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
    <!-- if mobile -->
  {:else}
    <div class="mobile-caption">Crowding across All Occupations</div>
    {#each Array(2) as _, i}
      <table style:width="100%">
        <!-- header row -->
        {#each tableData[0].slice(i + 1, i + 2) as header}
          <caption class="mobile-table-caption" style:padding-top={i === 1 ? "1.5rem" : ".5rem"}
            >{header}</caption
          >
        {/each}
        <!-- body -->
        <tbody>
          {#each tableData.slice(1) as row, j}
            <!-- highlight if current row matches filtered data's crowding designation -->
            <tr class:highlight={(j + 1).toString() === filtered_data?.crowd_desig_chr}>
              {#each [row[0], row[i + 1]] as cell}
                <td>{cell}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    {/each}
  {/if}
</div>

<style>
  table {
    border-collapse: collapse;
    font-size: var(--font-size-small);
    margin: auto;
  }

  caption {
    text-align: left;
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-normal);
    padding: 0 0 var(--spacing-2) var(--spacing-2);
  }

  .mobile-caption {
    text-align: left;
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-normal);
    padding-left: var(--spacing-2);
    padding-bottom: var(--spacing-3);
  }

  .mobile-table-caption {
    border: 1px solid var(--color-gray-shade-light);
    border-bottom: none;
    padding-top: 0.5rem;
  }

  table:nth-of-type(2) .mobile-table-caption {
    border-top: none;
  }

  /* header/cells */
  th,
  td {
    /* box-sizing: border-box; */
    border: 1px solid var(--color-gray-shade-light);
    padding: var(--spacing-2);
  }

  th {
    text-align: center;
    border: none;
  }

  thead tr th {
    border: 1px solid var(--color-gray-shade-light);
  }

  /* combined header row */
  /* tr.all-occ-row th {
    padding: 0;
  } */

  /* left-borders on first column */
  td:first-child {
    text-align: left;
    /* border-left: 0.3125rem solid var(--color-blue); /* first row color */
    box-shadow: inset 5px 0px 0px 0px var(--color-blue);
    padding-left: var(--spacing-3);
  }

  /* width */
  th:not(:first-child) {
    width: 10.5rem !important;
  }

  th:first-child {
    width: 9rem !important;
  }

  /* second row color */
  tr:nth-child(2) td:first-child {
    box-shadow: inset 5px 0px 0px 0px var(--color-yellow);
  }

  /* third row color */
  tr:nth-child(3) td:first-child {
    box-shadow: inset 5px 0px 0px 0px var(--color-blue-shade-darker);
  }

  /* center not first column */
  td:not(:first-child) {
    text-align: center;
  }

  /* highlighted row class */
  .highlight {
    background-color: var(--color-gray-shade-lightest);
  }
</style>
