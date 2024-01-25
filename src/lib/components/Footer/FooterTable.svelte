<!--
  @component Footer sources table (non-mobile)
-->
<script>
  import FooterTableMobile from "./FooterTableMobile.svelte";
  $: clientWidth = 0;
</script>

<div bind:clientWidth>
  <h3 style:padding-bottom="2rem">Job-Quality Variables and Sources</h3>
  <div style:text-align="center">
    {#if clientWidth !== 0 && clientWidth > 576}
      <table>
        <tbody>
          <tr class="th-bg">
            <th>Domain</th>
            <th>Variable</th>
            <th>Source</th>
          </tr>
          <tr>
            <td class="font-bold">Pay</td>
            <td>Median annual wage</td>
            <td>Occupational Employment and Wage Statistics (OEWS)</td>
          </tr>
          <tr class="bg-highlight">
            <td class="font-bold" rowspan="4">Hours/Scheduling/Benefits</td>
            <td>Percent of workers working 40 hours a week</td>
            <td rowspan="2">Occupational Requirements Survey (ORS)</td>
          </tr>
          <tr class="bg-highlight">
            <td
              >Percent of workers working a regular schedule (as opposed to irregular or seasonal)</td
            >
          </tr>
          <tr class="bg-highlight">
            <td>Percent of workers who take up health insurance coverage</td>
            <td>American Community Survey (ACS)</td>
          </tr>
          <tr class="bg-highlight">
            <td>Percent of workers offered a retirement or pension plan</td>
            <td>Current Population Survey-Annual Social and Economic Supplement (CPS-ASEC)</td>
          </tr>
          <tr>
            <td class="font-bold" rowspan="2">Job security</td>
            <td>Projected change in total employment from 2021–2031</td>
            <td>Bureau of Labor Statistics (BLS) Employment Projections</td>
          </tr>
          <tr>
            <td>Unemployment rate in 2022</td>
            <td>Current Population Survey (CPS)</td>
          </tr>
          <tr class="bg-highlight">
            <td class="font-bold">Working Conditions</td>
            <td>Rate of injury/illness per 100 workers</td>
            <td>BLS Survey of Occupational Injuries and Illnesses (SOII)</td>
          </tr>
          <tr>
            <td class="font-bold">Training/ Advancement</td>
            <td>Mean days of on-the-job training required</td>
            <td>Occupational Requirements Survey (ORS)</td>
          </tr>
          <tr class="bg-highlight">
            <td class="font-bold" rowspan="2">Voice</td>
            <td>Percent of workers covered by a union</td>
            <td>Current Population Survey-Annual Social and Economic Supplement (CPS-ASEC)</td>
          </tr>
          <tr class="bg-highlight">
            <td>Level of autonomy</td>
            <td>O*NET OnLine</td>
          </tr>
        </tbody>
      </table>
    {:else if clientWidth < 576}
      <FooterTableMobile />
    {:else}
      <div>loading...</div>
    {/if}
  </div>
</div>

<style>
  /* foundation */
  table {
    border-collapse: collapse;
    width: 100%;
    text-align: left;
    font-size: var(--font-size-large);
  }

  td {
    padding: var(--spacing-3) var(--spacing-4);
    border: 1px solid var(--color-gray-shade-light);
    text-align: left;
  }

  /* background/highlight classes */
  .th-bg {
    background-color: #094c6a;
    color: #fff;
    border: 1px solid #094c6a;
    font-weight: var(--font-weight-bold);
  }

  .th-bg th {
    padding: var(--spacing-2) var(--spacing-4);
  }

  .bg-highlight {
    background-color: #f4f6f8;
  }

  h3 {
    color: var(--color-black);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-normal);
    text-transform: none;
  }
</style>
