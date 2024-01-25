<!--
  @component
  Scrollytelling parent for the infographic and radial visualization. Uses @sveltejs/svelte-scroller from Rich Harris.
-->
<script>
  // import utils
  import { fade } from "svelte/transition";
  import { setContext } from "svelte";
  setContext("group", "Black women");

  // import components
  // @ts-ignore
  import Scroller from "@sveltejs/svelte-scroller";
  import Radial from "$components/Radial/Radial.svelte";
  import Infographic from "./ScrollyInfographic.svelte";

  // import stores
  import { selected_occupation_scrolly } from "$stores/selected_occ_ind";

  /**
   * @type {number}
   */
  let scroll_index;

  // set active occupation based on scroll index
  $: {
    if (scroll_index < 4) {
      selected_occupation_scrolly.set("");
    }
    if (scroll_index === 4) {
      selected_occupation_scrolly.set("472100");
    }
    if (scroll_index === 5) {
      selected_occupation_scrolly.set("353000");
    }
    if (scroll_index === 6) {
      selected_occupation_scrolly.set("");
    }
  }

  // declare slide dimensions
  $: slideHeight = 0;
  $: slideWidth = 0;

  // set Scroller props
  let top = 0.25;
  $: progress = 0;
  $: threshold = slideWidth < 769 ? 0.6 : 0.7;
  $: bottom = slideWidth < 450 ? 0.15 : slideWidth < 769 ? 0.25 : slideWidth < 1025 ? 0.5 : 0.6;
  $: {
    if (slideHeight < 500) {
      bottom = 0.8;
    }
  }
</script>

<!-- get the full window height/width to use for full-screen scrolly -->
<svelte:window bind:innerWidth={slideWidth} bind:outerHeight={slideHeight} />

<Scroller {top} {bottom} {threshold} bind:index={scroll_index} bind:progress>
  <div slot="background">
    <div class="scrolly-chart-container">
      <!-- on desktop, show infographic on step 0 -->
      {#if slideWidth > 768 && scroll_index === 0}
        <!-- in:fade to avoid overlap (two components showing at once) -->
        <div class="infographic" in:fade={{ delay: 0, duration: 500 }}>
          <Infographic />
        </div>
        <!-- on mobile, show infographic on step 0 after the user starts scrolling -->
      {:else if slideWidth <= 768 && scroll_index === 0 && progress > 0}
        <!-- in:fade to avoid overlap (two components showing at once) -->
        <div class="infographic" in:fade={{ delay: 0, duration: 500 }}>
          <Infographic />
        </div>
      {:else if scroll_index >= 1}
        <!-- if step is not 0, show radial visualization -->
        <!-- in:fade to avoid overlap (two components showing at once) -->
        <div in:fade={{ delay: 0, duration: 500 }}>
          <Radial ui_type="scrolly" {scroll_index} />
        </div>
      {/if}
    </div>
  </div>

  <div
    slot="foreground"
    style:--section-margin-bottom="{slideHeight * (slideWidth <= 768 ? 0.75 : 0.5)}px"
  >
    <section>
      <p class:drop-shadowed={slideWidth < 769}>
        The average median salary for Black women among occupations that they are <span
          class="highlight-ci">crowded in to is $31,899</span
        >, and the average for the occupations they are
        <span class="highlight-co">crowded out of is $42,589</span>. But other factors also affect
        these quality scores, as Black women are more likely to be in occupations without health
        insurance, without union access, and with irregular schedules.
      </p>
    </section>
    <section>
      <p class:drop-shadowed={slideWidth < 769}>
        To illustrate the extent to which Black women are crowded in to or out of high-quality
        positions, we have sorted 108 occupations by their crowding categorization and job-quality
        index.
      </p>
    </section>
    <section>
      <p style:margin-bottom="20rem" class:drop-shadowed={slideWidth < 769}>
        For the <a
          href="https://racepowerpolicy.org/wp-content/uploads/2023/05/Building_An_Equitable_Recovery_Hamilton_et_al_2021.pdf"
          target="_blank">crowding characterization</a
        >, we divide the actual share of Black women in a job compared with white men by the
        expected share of Black women compared with white men based on the occupation’s necessary
        educational attainment. <span class="highlight-p">Proportional</span>
        representation falls between 0.9 and 1.1, while anything below 0.9 indicates a group is
        <span class="highlight-co">crowded out</span>
        and anything above 1.1 indicates a group is
        <span class="highlight-ci">crowded in</span>.
      </p>
    </section>

    <section>
      <p class:drop-shadowed={slideWidth < 769}>
        For job quality, we measure the 11 job-quality variables as above or below average for each
        occupation, creating an overall score on a scale of 1 to 11. Occupations with a score of 1
        to 5 are considered below average, whereas occupations with a score of 6 to 11 are
        considered above average. No occupation has a quality score of 11.
      </p>
    </section>
    <section>
      <p class:drop-shadowed={slideWidth < 769}>
        Using our <b>electrician</b> example, roughly 5,000 Black women work as electricians despite
        nearly 4.5 million having at least a high school credential but no more than some college
        credits. Meanwhile, almost 1.2 million white men work as electricians with just over 20
        million having the same educational parameters. As a result, we find that Black women are
        dramatically
        <span class="highlight-co">crowded out</span> of the high-quality occupation. They also are paid
        less as an electrician, earning just 67.5 percent of the median electrician's wages.
      </p>
    </section>
    <section>
      <p class:drop-shadowed={slideWidth < 769}>
        <b>Food and beverage work</b>, alternatively, falls on the left-hand side of the innermost
        circle, meaning Black women are <span class="highlight-ci">crowded in</span> to this low-quality
        job. When they are in these roles, Black women earn $15,700.
      </p>
    </section>
    <section>
      <p class:drop-shadowed={slideWidth < 769}>
        By comparing occupational crowding and job quality, we can see how workforce discrimination
        can create inequities unsolvable by higher educational achievement. Below, we've mapped
        occupational crowding for Black, Latinx, and white men and women along with 11 indicators of
        job quality. Use these charts to explore how workers are crowded in to or out of
        high-quality jobs.
      </p>
    </section>
  </div>
</Scroller>

<style>
  section {
    width: 45%;
    /* use padding instead of large height to separate sections */
    /* height: 80vh; */
    margin-bottom: var(--section-margin-bottom);
    margin-right: auto;
    font-size: var(--font-size-xl);
    line-height: var(--spacing-8);
  }

  section p {
    display: block;
    background-color: #fffffff2;
    padding: var(--spacing-4);
    margin-bottom: 10rem;
  }

  /* last section spacing */
  div[slot="foreground"] section:last-child {
    margin-bottom: calc(var(--section-margin-bottom) * 0.5);
  }

  @media (max-width: 48rem) {
    div[slot="foreground"] section:last-child {
      margin-bottom: calc(var(--section-margin-bottom) * 1.25);
    }
  }

  @media (max-width: 28rem) {
    div[slot="foreground"] section:last-child {
      margin-bottom: calc(var(--section-margin-bottom) * 0.75);
    }
  }

  /* scrolly background */
  .scrolly-chart-container {
    max-width: 34rem;
    margin-left: auto;
  }

  /* on desktop, half of the right area */
  @media (max-width: 68rem) {
    .scrolly-chart-container {
      max-width: calc(100vw * 0.48);
    }
  }

  /* on mobile, centered */
  @media (max-width: 48rem) {
    section {
      width: 100%;
    }

    .scrolly-chart-container {
      max-width: 34rem;
      margin: 0 auto;
    }
  }

  /* mobile landscape centered */
  @media (max-height: 46rem) and (max-width: 48rem) {
    .scrolly-chart-container {
      max-width: 90vh;
      margin: -3rem auto;
    }

    section p {
      margin-bottom: 20rem;
    }
  }

  /* mobile landscape left/right*/
  @media (max-height: 46rem) and (min-width: 48rem) {
    .scrolly-chart-container {
      max-width: clamp(0rem, 90vh, calc(100vw * 0.48));
      margin-top: -3rem;
      margin-left: auto;
    }
  }

  /* infographic */
  .infographic {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 48rem) and (min-width: 34rem) {
    .infographic {
      padding-top: 150px;
    }
  }
</style>
