<script>
  import "../app.css";
  import { getAbsoluteUrl } from "$lib/utils/urls.js";
  import Meta from "$components/Meta/Meta.svelte";
  import { logClickToGA } from "$utils/analytics";
  import Hero from "$components/Hero/Hero.svelte";
  import Header from "$components/Header/Header.svelte";
  import Intro from "$components/Intro/Intro.svelte";
  import Scrolly from "$components/Scrolly/Scrolly.svelte";
  import Occupation from "$components/Occupation/Occupation.svelte";
  import Card from "$components/Card/Card.svelte";
  import CardHeader from "$components/Card/CardHeader.svelte";
  import Radial from "$components/Radial/Radial.svelte";
  import CardTable from "$components/Card/CardTable.svelte";
  import { ReturnTop } from "@urbaninstitute/dataviz-components";
  import Footer from "$components/Footer/Footer.svelte";
</script>

<Meta
  title="Getting a Good Job Depends More on Race and Gender than Education"
  description="Workforce discrimination can create inequities in job quality that are unsolvable by higher educational achievement, leading to occupational crowding by race and gender."
  social_image={getAbsoluteUrl("social.jpg")}
  url="https://apps.urban.org/features/job-quality-segregation-race-gender/"
  keywords={[
    "Economic well-being",
    "Employment",
    "Employment and education",
    "Employment and income data",
    "Employment discrimination",
    "Higher education",
    "Inequities in educational achievement",
    "Job markets and labor force",
    "Job training",
    "Labor force",
    "Occupational segregation",
    "Race inequities in economic mobility",
    "Racial inequities in employment",
    "Wages and nonwage compensation",
    "Workplace and industry studies",
  ]}
  authors={[
    "Ofronama Biu",
    "Batia Katz",
    "Afia Adu-Gyamfi",
    "Molly M. Scott",
    "Brittney Spinner",
    "Ben Kates",
    "Alex Dallman",
    "Wesley Jenkins",
  ]}
/>
<div class="stick">
  <Header />
</div>
<header>
  <Hero />
</header>
<main>
  <div class="intro-container">
    <Intro />
  </div>
  <hr class="intro-scrolly-sep" />

  <Scrolly />
  <hr style:margin="3rem 0" />

  <section>
    <Occupation />
    <div class="card-group">
      {#each ["Black men", "Black women", "Latinx men", "Latinx women", "White men", "White women"] as group}
        <Card {group}>
          <CardHeader />
          <Radial />
          <CardTable />
        </Card>
      {/each}
    </div>
    <div class="return-top">
      <ReturnTop
        elementId="tool-title"
        on:click={(e) => {
          document.getElementById("tool-title")?.scrollIntoView();
          logClickToGA(e.detail.target, "return-to-top");
        }}
        on:keypress={(e) => {
          document.getElementById("tool-title")?.scrollIntoView();
          logClickToGA(e.detail.target, "return-to-top");
        }}
      />
    </div>
  </section>
  <section class="footer">
    <Footer />
  </section>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    padding: var(--spacing-4);
    max-width: 73.625rem;
    margin: 0 auto;
  }

  .stick {
    box-sizing: inherit;
    width: 100%;
    display: block;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .intro-container {
    max-width: 46.75rem;
    margin: var(--spacing-20) auto 0 auto;
  }

  @media (max-width: 48rem) {
    .intro-container {
      margin: var(--spacing-8) auto 0 auto;
    }
  }

  .intro-scrolly-sep {
    margin: 6rem 0;
  }

  @media (max-width: 36rem) {
    .intro-scrolly-sep {
      margin: 3rem 0;
    }
  }

  /* card */
  .card-group {
    width: 100%;
    padding-top: var(--spacing-8);
    margin: auto;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-6);
  }

  @media (max-width: 56rem) {
    .card-group {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  /* return to top */
  .return-top {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: end;
  }

  @media (max-width: 56rem) {
    .return-top {
      max-width: 38rem;
    }
  }

  /* footer */
  .footer {
    margin-top: 8rem;
  }

  @media (max-width: 48rem) {
    .footer {
      margin-top: var(--spacing-20);
    }
  }
</style>
