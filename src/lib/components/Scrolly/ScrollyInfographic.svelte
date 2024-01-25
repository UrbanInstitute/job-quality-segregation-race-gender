<!--
  @component
  Infographic for the scrollytelling section of the visualization. Shows median salary for crowded in and crowded out occupations of Black women.
-->
<div class="infographic-container">
  <!-- first section -->
  <div
    class="section"
    aria-label="An infographic showing the average wages black women make in occupations they are crowded in to is $31,889"
  >
    <div class="number" aria-hidden="true">$31,889</div>
    <div class="text" aria-hidden="true">
      Average<br /><span style:padding=".25rem" class="highlight-ci">crowded in</span> wages
    </div>
  </div>

  <!-- line -->
  <hr aria-hidden="true" />

  <!-- icon -->
  <div style:position="relative" aria-hidden="true">
    <svg class="dollar-sign" width="60" height="60" viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" />
      <text x="50%" y="55%" dominant-baseline="middle">$</text>
    </svg>
  </div>

  <!-- second section -->
  <div
    class="section"
    aria-label="An infographic showing the average wages black women make in occupations they are crowded out of is $42,589"
  >
    <div class="number" aria-hidden="true">$42,589</div>
    <div class="text" aria-hidden="true">
      Average<br /><span class="highlight-co">crowded out</span> wages
    </div>
  </div>
</div>

<style>
  .infographic-container {
    display: inline-flex;
    flex-direction: column;
    width: 16rem;
  }

  hr {
    width: 100%;
    border: none;
    border-bottom: 0.0625rem dashed #353535;
    background-color: none;
    height: 0px;
  }

  .number {
    font-size: var(--font-size-6xl);
    font-weight: var(--font-weight-light);
  }

  .text {
    font-size: var(--font-size-2xl);
  }

  .section:first-child {
    margin-bottom: var(--spacing-4);
  }

  svg.dollar-sign {
    position: absolute;
    left: 90%;
    top: -41px;
  }

  svg.dollar-sign circle {
    fill: var(--color-white);
    stroke: var(--color-black);
    stroke-width: 2;
  }

  svg.dollar-sign text {
    font-weight: var(--font-weight-normal);
    font-size: 2.5rem;
    text-anchor: middle;
  }

  /* tablet orientation */
  @media (max-width: 48rem) and (min-width: 34rem) {
    .infographic-container {
      flex-direction: row;
      justify-content: center;
      gap: var(--spacing-4);
    }

    .section:last-child {
      content: "";
      border-left: 0.0625rem dashed #353535;
      align-self: stretch;
      padding-left: var(--spacing-8);
    }

    svg.dollar-sign {
      top: -58px;
      left: -13px;
    }

    hr {
      display: none;
    }
  }
</style>
