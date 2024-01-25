<!--
  @component
  Lines to guide nodes along the designated quality score. Divides the circle into 12 sections and uses gaps to place 1-5 and 6-10 on the left and right.
-->
<script context="module">
  const component_name = "RadialQualityGuides";
</script>

<script>
  // import utils
  import { kebabCase } from "@urbaninstitute/dataviz-components/utils";
  import { steps } from "$utils/scrollySteps";
  import { getContext } from "svelte";
  const { width, height, xGet, custom } = getContext("LayerCake");
  let group = getContext("group");

  // SCROLLY
  $: scroll_opacity = 1;
  $: scroll_emphasize = false;
  $: {
    if ($custom.ui_type === "scrolly") {
      scroll_opacity = steps[component_name].active_steps.includes($custom.scroll_index) ? 1 : 0.25;
      scroll_emphasize = steps[component_name].emphasize_steps.includes($custom.scroll_index);
    }
  }
</script>

<!-- quality lines -->
<g
  id="{kebabCase(group)}-quality-lines"
  opacity={scroll_opacity}
  aria-hidden="true"
  focusable="false"
>
  {#each Array(10) as _, j}
    {@const i = j + 1}
    {@const angle = ((i > 5 ? i + 1 : i) / 12) * 2 * Math.PI - Math.PI / 2}
    {@const radius = $xGet({ crowd_desig_flipped: 3.7 })}
    {@const inner_radius = $xGet({ crowd_desig_flipped: 0.175 })}
    {@const x1 = $width / 2 + Math.cos(angle) * inner_radius}
    {@const y1 = $height / 2 + Math.sin(angle) * inner_radius}
    {@const x2 = $width / 2 + Math.cos(angle) * radius}
    {@const y2 = $height / 2 + Math.sin(angle) * radius}
    <line
      {x1}
      {y1}
      {x2}
      {y2}
      stroke={scroll_emphasize ? "#9d9d9d" : "#D8D8D8"}
      stroke-width={scroll_emphasize ? ($width > 425 ? 4 : 2.5) : 2.5}
      aria-hidden="true"
      focusable="false"
    />
  {/each}
  <!-- center circle -->
  <circle
    r={$xGet({ crowd_desig_flipped: 0.175 })}
    fill={scroll_emphasize ? "#9d9d9d" : "#D8D8D8"}
    stroke="none"
    cx={$width / 2}
    cy={$height / 2}
  />
</g>
