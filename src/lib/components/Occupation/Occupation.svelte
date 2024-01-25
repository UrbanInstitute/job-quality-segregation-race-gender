<!--
  @component Occupation header parent, containing two dropdowns, occupation title, metrics, and score grid of the occupation's quality indicators
-->
<script>
  // import components
  import Dropdown from "./OccupationDropdown.svelte";
  import Metrics from "./OccupationMetrics.svelte";
  import ScoreGrid from "./OccupationScoreGrid.svelte";
  import Title from "./OccupationTitle.svelte";

  // import data
  import industry_data from "$data/industry-data.json";
  import occupation_data from "$data/occupation-data.json";

  // import stores
  import { selected_industry, selected_occupation } from "$stores/selected_occ_ind";

  // import analytics
  import { logClickToGA } from "$utils/analytics";

  // create dropdown data
  $: industry_dropdown_data = industry_data.map((d) => ({
    value: d.code_prefix,
    label: d.soc_category.replace(" Occupations", ""),
  }));

  $: occupation_dropdown_data = occupation_data
    .filter((d) => {
      return d.code_prefix == $selected_industry;
    })
    .map((d) => ({
      value: d.soc,
      label: `${d.name} (${d.benchmark_sum})`,
    }));

  $: handle_industry_dropdown_change = (/** @type {CustomEvent<any>} */ e) => {
    // use occupation_data because there is a bug on firefox where occupation_dropdown_data is not updated
    let new_occ = occupation_data.filter((d) => {
      return e.detail.target.value == d.code_prefix;
    })[0].soc;
    if (new_occ) {
      selected_occupation.set(new_occ);
    }
  };
</script>

<h2 id="tool-title" style:scroll-margin-top="70px">
  Compare the Representation of Race and Gender Groups across Occupations
</h2>
<div class="dropdown-container">
  <Dropdown
    id="occupation_group_dropdown"
    data={industry_dropdown_data}
    bind:value={$selected_industry}
    on:change={(e) => {
      handle_industry_dropdown_change(e);
      let selected_ind_label = industry_dropdown_data.find((d) => {
        return d.value === e.detail.target.value;
      })?.label;
      logClickToGA(e.detail.target, `occupation_category_dropdown_select--${selected_ind_label}`);
    }}
    inline_label="Category"
  />
  <Dropdown
    id="occupation_dropdown"
    data={occupation_dropdown_data}
    bind:value={$selected_occupation}
    inline_label="Occupation (Quality)"
    on:change={(e) => {
      let selected_occ_label = occupation_dropdown_data.find((d) => {
        return d.value === e.detail.target.value;
      })?.label;
      logClickToGA(e.detail.target, `occupation_dropdown_select--${selected_occ_label}`);
    }}
  />
</div>
<div class="occupation-header-container bordered">
  <Title />
  <div class="occupation-header">
    <Metrics />
    <ScoreGrid />
  </div>
</div>

<style>
  /* dropdowns */
  .dropdown-container {
    display: flex;
    flex-direction: row;
    justify-content: start;
    gap: var(--spacing-4);
    padding: var(--spacing-10) 0;
    flex-wrap: wrap;
  }

  @media (max-width: 36rem) {
    .dropdown-container {
      padding: var(--spacing-5) 0;
    }
  }

  /* occupation */
  .occupation-header-container {
    width: 100%;
    max-width: 100%;
    padding: var(--spacing-8) var(--spacing-8) var(--spacing-6) var(--spacing-8);
    margin: 0 auto;
    box-sizing: border-box;
  }

  .occupation-header {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-16);
    padding-top: var(--spacing-4);
  }

  @media (max-width: 48rem) {
    .occupation-header {
      flex-direction: column;
      gap: var(--spacing-8);
    }
  }

  .occupation-header :global(> :first-child) {
    flex-grow: 1;
  }

  .occupation-header :global(> :nth-child(2)) {
    flex-grow: 7;
  }
</style>
