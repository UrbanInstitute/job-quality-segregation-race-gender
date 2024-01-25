<!--
  @component Footer about section
-->
<h2>About the Data</h2>
<p>
  Occupational crowding data, health insurance, and part-time employment data are from the American
  Community Survey 2020 Five-Year Estimates. The sample includes people ages 25–64 who are employed
  or unemployed. Occupational crowding for Black women, Black men, Latinx women, Latinx men, and
  white women is in comparison with white men, and white men are shown in comparison with the
  economy, following the approach described by <a
    href="https://racepowerpolicy.org/wp-content/uploads/2023/05/Building_An_Equitable_Recovery_Hamilton_et_al_2021.pdf"
    target="_blank">Hamilton and colleagues</a
  >. Throughout this feature, we use the term "Latinx" to be as inclusive as possible, but we
  understand that not everyone may identify with this term.
</p>
<p>
  For job-quality data, we identified 11 key indicators from publicly accessible data to represent
  job quality related to occupational crowding and combined these indicators into one dataset. To
  understand pay, hours, scheduling, nonwage benefits, job security, working conditions, training
  and advancement, and worker voice, we used the following variables to create one overall
  job-quality score.
</p>

<div class="table">
  <slot />
</div>

<p>
  To understand how these variables differed by occupation, we looked at occupations at the
  four-digit Standard Occupational Classification (SOC) code level. SOC codes can be viewed at the
  two-, four-, or six-digit level, with increasing levels of detail in classification. We chose the
  four-digit level because it had the best balance of precise detail as well as accessible data. We
  used 108 occupations with sufficient data for this analysis. There were 109 occupations
  identified, but for this analysis, we excluded "all other postsecondary teachers" as we were
  unable to match the data to ACS at the four-digit level for crowding analyses. Latinx women and
  Black women do not have enough data for all 108 occupations, displaying 104 and 102 occupations
  respectively.
</p>

<p>
  To compare job quality among occupations, we used the values for all the above variables to create
  a job-quality score. If an occupation's value for a variable was better than average for all
  occupations aggregated, the occupation received one point. If the occupation's value was worse
  than average, the occupation received zero points. A lower score indicated a “better” score for
  two indicators: unemployment and injury rates. We then calculated a final score, which is the
  total number of elements for which an occupation had a better-than-average value. By this process,
  we interpreted a higher total score as a better overall job.
</p>

<p>
  To see limitations to this methodology, view the <a
    href="https://www.urban.org/research/publication/job-quality-and-race-and-gender-equity"
    target="_blank">full report</a
  >.
</p>

<style>
  h2 {
    color: var(--color-black);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-light);
    line-height: var(--line-height-normal);
    text-transform: uppercase;
    padding-bottom: var(--spacing-8);
  }

  .table {
    padding: 4.5rem 0;
  }

  @media (max-width: 48rem) {
    .table {
      padding: var(--spacing-12) 0;
    }
  }
</style>
