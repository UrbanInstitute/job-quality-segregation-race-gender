<!--
  @component Footer parent containing the About section with sources table and Credits section
-->
<script>
  import { ProjectCredits, TextBlock } from "@urbaninstitute/dataviz-components";
  import About from "./FooterAbout.svelte";
  import Table from "./FooterTable.svelte";
  import credits_data from "$data/credits-data.json";
</script>

<div class="container">
  <section style:margin-bottom="4.5rem">
    <About>
      <Table />
    </About>
  </section>
  <section class="project-credits">
    <ProjectCredits
      heading="Project credits"
      items={credits_data}
      githubUrl="https://github.com/urbaninstitute/job-quality-segregation-race-gender"
    >
      <TextBlock slot="intro">
        This data tool was funded by the Bill and Melinda Gates Foundation. We are grateful to them
        and to all our funders, who make it possible for Urban to advance its mission. The views
        expressed are those of the authors and should not be attributed to the Urban Institute, its
        trustees, or its funders. Funders do not determine research findings or the insights and
        recommendations of our experts. More information on our funding principles is available <a
          href="https://www.urban.org/about/our-funding"
          target="_blank">here</a
        >. Read our terms of service
        <a href="https://www.urban.org/terms-service" target="_blank">here</a>.</TextBlock
      >
    </ProjectCredits>
  </section>
</div>

<style>
  .container {
    max-width: 46.75rem;
    margin: 0 auto;
    padding-bottom: var(--spacing-16);
  }

  .project-credits :global(div) {
    max-width: 100%;
    margin: 0;
  }

  .project-credits :global(h3) {
    margin-bottom: var(--spacing-8) !important;
  }

  .container :global(a:hover) {
    color: var(--color-blue-shade-dark);
  }
</style>
