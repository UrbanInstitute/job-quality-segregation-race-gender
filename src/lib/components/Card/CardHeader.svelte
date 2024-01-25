<!--
  @component Card header containing group title, occupation title, crowding label, metrics, and crowding "madlibs" text
-->
<script>
  // import utils
  import { dollarFormat } from "@urbaninstitute/dataviz-components/utils";
  import { getContext, onMount } from "svelte";
  let group = getContext("group");

  // import stores
  import {
    selected_occupation_data,
    group_selected_occupation_data,
  } from "$stores/selected_occ_ind";

  // impor textfit, code copied from the repo below and added to utils (not updated for Svelte 4)
  // https://github.com/micha-lmxt/svelte-textfit
  import { textfit } from "$utils/text-fit-action";

  // declare client width for card
  $: clientWidth = 0;

  // selected occupation data for the group
  $: filtered_data = $group_selected_occupation_data.find((d) => d.race_gender_labels === group);

  // if the filtered data doesn't have a crowding designation, set it to 4 (no data)
  $: {
    if (filtered_data && !filtered_data?.hasOwnProperty("crowd_desig_chr")) {
      filtered_data.crowd_desig_flipped = 4;
    }
  }

  // set metadata for crowding designations
  let crowding_metadata = [
    {
      label: "Crowded In",
      class: "highlight-ci",
      text: "overrepresented",
    },
    {
      label: "Proportional",
      class: "highlight-p",
      text: "fairly represented",
    },
    {
      label: "Crowded Out",
      class: "highlight-co",
      text: "underrepresented",
    },
    { label: "No data", class: "highlight-na" },
  ];

  // set crowding metadata based on the filtered data's crowding designation
  /**
   * @type {{ label: string; color: string; bgColor: string; text?: string;class:string; }}
   */
  let d;
  $: {
    if (filtered_data?.crowd_desig_flipped)
      // @ts-ignore
      d = crowding_metadata[filtered_data.crowd_desig_flipped - 1];
  }

  // get selected occupation data for the group based on the group
  $: occ_name = $selected_occupation_data?.name;

  // format median income
  /**
   * @type {string}
   */
  let median_income;

  $: {
    if (filtered_data?.med_inc_grp) median_income = dollarFormat(filtered_data?.med_inc_grp);
  }

  // add 0 to score if it's less than 10
  $: score = $selected_occupation_data?.benchmark_sum.toString();
  $: {
    score = score === "10" ? score : "0" + score;
  }

  // declare parent for text-fit
  let parent;

  // check if browser is firefox (due to text-fit not working on firefox)
  let isFirefox = false;
  onMount(() => {
    if (window) {
      isFirefox = window.navigator.userAgent.indexOf("Firefox") > -1;
    }
  });
</script>

<div class="card-header-container" bind:clientWidth>
  <!-- group title -->
  <h3 class="group-title">{group}</h3>
  <hr style:background="var(--color-gray-shade-light)" />
  <div
    class="occ-title-container"
    style:height={clientWidth < 400 ? "4rem" : "3rem"}
    bind:this={parent}
  >
    <!-- occupation name -->
    <!-- if firefox, use manually determined font sizes based on occupation name length -->
    {#if isFirefox && occ_name}
      {@const title_font_size =
        occ_name.length > 80 ? "1rem" : occ_name.length > 40 ? "1.125rem" : "1.5rem"}
      <span class="occ-title" style:font-size={title_font_size}>
        {occ_name}
      </span>
      <!-- otherwise, use textfit Svelte action -->
    {:else if occ_name}
      <span
        class="occ-title"
        use:textfit={{
          parent,
          mode: "multi",
          min: 16,
          max: 24,
          update: occ_name,
          autoResize: true,
        }}
      >
        {occ_name}
      </span>
    {/if}

    <!-- crowding for specific occupation/group -->
    <span class="{d.class} crowding-label">/ {d.label}</span>
  </div>

  <!-- metrics -->
  <div class="metric-container">
    <div class="metric">
      <span>Median Income</span>
      <span>{median_income}</span>
    </div>
    <div class="metric">
      <span>Quality Score</span>
      <span>{score}</span>
    </div>
  </div>

  <!-- madlibs sentence -->
  <!-- if valid crowding designation -->
  <div style:height={clientWidth < 400 ? "4rem" : "3rem"}>
    {#if filtered_data?.crowd_desig_flipped && filtered_data.crowd_desig_flipped < 4}
      <span
        ><b>{group}</b> are <b>{d.text}</b> in this
        <b
          >{$selected_occupation_data && $selected_occupation_data?.benchmark_sum > 5
            ? "high"
            : "low"}-quality</b
        >
        occupation compared with
        <b>{group === "White men" ? "all workers" : "white men"}</b>.</span
      >
      <!-- if no crowding designation -->
    {:else}
      <span
        >No crowding data available for <b>{group}</b> in this
        <b
          >{$selected_occupation_data && $selected_occupation_data?.benchmark_sum > 5
            ? "high"
            : "low"}</b
        > quality occupation</span
      >
    {/if}
  </div>
</div>

<style>
  /* card header container */
  .card-header-container {
    margin: var(--spacing-2) var(--spacing-8) var(--spacing-1) var(--spacing-8);
  }

  @media (max-width: 36rem) {
    .card-header-container {
      margin: var(--spacing-2) var(--spacing-2) 0 var(--spacing-2);
    }
  }

  /* group */
  .group-title {
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-light);
    text-transform: uppercase;
  }

  /* occupation title */
  .occ-title-container {
    /* height: fit-content; */
    width: 100%;
    padding-bottom: var(--spacing-2);
  }

  span.occ-title {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
  }

  span.crowding-label {
    font-size: var(--font-size-small);
    text-transform: uppercase;

    /* prevent trailing slash */
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* metrics (median income and quality score) */
  .metric-container {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-10);
    width: 100%;
    padding: var(--spacing-5) 0 var(--spacing-1) 0;
  }

  .metric {
    display: flex;
    flex-direction: column;
    gap: 0rem;
  }

  .metric span:last-child {
    font-weight: var(--font-weight-light);
    font-size: 1.75rem;
  }

  .metric span:first-child {
    text-transform: uppercase;
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-bold);
  }
</style>
