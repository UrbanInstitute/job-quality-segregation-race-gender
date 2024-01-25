<!--
  @component Introduction section of the project containing text on methodology, framework, and findings.
-->
<script>
  import Crowding from "./IntroCrowding.svelte";
  import Beginning from "./IntroBeginning.svelte";
  import IndicatorTable from "./IntroIndicatorTable.svelte";
  import Salary from "./IntroSalary.svelte";
  import OccupationTable from "./IntroOccupationTable.svelte";
</script>

<section>
  <Beginning />
  <IndicatorTable />
</section>

<section>
  <Crowding />
  <div class="occ-table">
    <OccupationTable />
  </div>
</section>

<section>
  <Salary />
</section>

<style>
  .occ-table {
    margin: var(--spacing-16) 0;
  }
</style>
