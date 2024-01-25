<!--
  @component Median income and quality score for selected job
-->
<script>
  import { dollarFormat } from "@urbaninstitute/dataviz-components/utils";
  import { selected_occupation_data } from "$stores/selected_occ_ind";

  $: score = $selected_occupation_data?.benchmark_sum.toString();
  $: {
    score = score === "10" ? score : "0" + score;
  }

  $: median_income = "";
  $: {
    if ($selected_occupation_data) {
      median_income = dollarFormat($selected_occupation_data?.median_annual_wage);
    }
  }
</script>

<div class="metric-container">
  <div class="metric">
    <span class="uppercase font-bold">Median Income<br />(All Workers)</span>
    <span class="text-3xl font-light">{median_income}</span>
  </div>

  <div class="metric">
    <span class="uppercase font-bold">Quality Score</span>
    <span class="text-3xl font-light">{score}</span>
  </div>
</div>

<style>
  .metric-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
    width: 14rem;
  }

  @media (max-width: 48rem) {
    .metric-container {
      flex-direction: row;
      justify-content: baseline;
      width: 100%;
    }

    .metric-container .metric:last-child span:first-child {
      padding-bottom: var(--spacing-6);
    }
  }

  .metric {
    display: flex;
    flex-direction: column;
    gap: 0rem;
  }

  .metric span {
    width: fit-content;
  }

  .metric span:last-child {
    font-weight: var(--font-weight-light);
    font-size: var(--font-size-3xl);
  }

  .metric span:first-child {
    text-transform: uppercase;
    font-size: var(--font-size-normal);
    font-weight: var(--font-weight-bold);
  }
</style>
