<!--
  @component Footer sources table (mobile)
-->
<table class="mobile">
  <tbody>
    <tr class="th-bg">
      <td>Domain: Pay</td>
    </tr>
    <tr>
      <td
        ><span><b>Variable:</b> Median annual wage</span><span
          ><b>Source:</b> Occupational Employment and Wage Statistics (OEWS)</span
        >
      </td>
    </tr>
    <tr class="th-bg">
      <td>Domain: Hours/Scheduling/Benefits</td>
    </tr>
    <tr>
      <td
        ><span><b>Variable:</b> Percent of workers working 40 hours a week</span><span
          ><b>Source:</b> Occupational Employment and Wage Statistics (OEWS)</span
        ></td
      >
    </tr>
    <tr>
      <td>
        <span
          ><b>Variable:</b> Percent of workers working a regular schedule (as opposed to irregular or
          seasonal)</span
        ><span><b>Source:</b> Occupational Employment and Wage Statistics (OEWS)</span>
      </td>
    </tr>
    <tr>
      <td
        ><span
          ><b>Variable:</b> Percent of workers who take up health insurance coverage
        </span><span><b>Source:</b> American Community Survey (ACS)</span></td
      >
    </tr>
    <tr>
      <td
        ><span><b>Variable:</b> Percent of workers offered a retirement or pension plan </span><span
          ><b>Source:</b> Current Population Survey-Annual Social and Economic Supplement (CPS-ASEC)</span
        ></td
      >
    </tr>
    <tr class="th-bg">
      <td>Domain: Job security</td>
    </tr>
    <tr>
      <td
        ><span><b>Variable:</b> Projected change in total employment from 2021–31</span><span
          ><b>Source:</b> Bureau of Labor Statistics (BLS)</span
        ></td
      >
    </tr>
    <tr>
      <td
        ><span><b>Variable:</b> Unemployment rate in 2022</span><span
          ><b>Source:</b> Current Population Survey (CPS)</span
        ></td
      >
    </tr>
    <tr class="th-bg">
      <td>Domain: Working conditions</td>
    </tr>
    <tr>
      <td
        ><span><b>Variable:</b> Rate of injury/illness per 100 workers</span><span
          ><b>Source:</b> BLS Survey of Occupational Injuries and Illnesses (SOII)</span
        ></td
      >
    </tr>
    <tr class="th-bg">
      <td>Domain: Training/Advancement</td>
    </tr>
    <tr>
      <td
        ><span><b>Variable:</b> Mean days of on-the-job training required</span><span
          ><b>Source:</b> Occupational Requirements Survey (ORS)</span
        ></td
      >
    </tr>
    <tr class="th-bg">
      <td>Domain: Voice</td>
    </tr>
    <tr>
      <td
        ><span><b><b>Variable:</b></b> Percent of workers covered by a union</span><span
          ><b>Source:</b> Current Population Survey-Annual Social and Economic Supplement (CPS-ASEC)</span
        ></td
      >
    </tr>
    <tr>
      <td
        ><span><b><b>Variable:</b></b> Level of autonomy</span><span
          ><b>Source:</b> O*NET OnLine</span
        ></td
      >
    </tr>
  </tbody>
</table>

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

  /* mobile view */
  .mobile tr td {
    display: flex;
    flex-direction: column;
    row-gap: var(--spacing-2);
  }

  /* no border */
  .mobile .th-bg {
    border: none;
  }

  /* no top border so that they don't overlap */
  .mobile td:first-child {
    border-top: none;
  }
</style>
