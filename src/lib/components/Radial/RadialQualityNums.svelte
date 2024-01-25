<!--
  @component
  Number labels for the quality line guides
-->
<script context="module">
  const component_name = "RadialQualityNums";
</script>

<script>
  // import utils
  import { kebabCase } from "@urbaninstitute/dataviz-components/utils";
  import { steps } from "$utils/scrollySteps";
  import { getContext } from "svelte";
  const { width, height, xGet, custom } = getContext("LayerCake");
  let group = getContext("group");

  $: radius = $xGet({ crowd_desig_flipped: 3.9 });

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

<g
  id="{kebabCase(group)}-quality-numbers"
  opacity={scroll_opacity}
  aria-hidden="true"
  focusable="false"
  tabindex="-1"
>
  {#each [6, 7, 8, 9, 10, 1, 2, 3, 4, 5] as d, i}
    {@const angle = ((i + 1 < 6 ? i + 1 : i + 2) / 12) * 2 * Math.PI - Math.PI / 2}
    <text
      x={$width / 2 + Math.cos(angle) * radius}
      y={$height / 2 + Math.sin(angle) * radius}
      fill="black"
      text-anchor="middle"
      alignment-baseline="middle"
      stroke="white"
      stroke-width="4"
      paint-order="stroke"
      font-weight={scroll_emphasize ? "700" : "400"}
      font-size={$width < 400 ? "1.125rem" : "1.25rem"}>{d}</text
    >
  {/each}
</g>

<style>
  text {
    pointer-events: none;
    user-select: none;
  }
</style>
