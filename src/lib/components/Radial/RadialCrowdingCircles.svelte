<!--
@component Crowding circles for the radial viz (concentric circles starting from the center working out)
-->
<script context="module">
  const component_name = "RadialCrowdingCircles";
</script>

<script>
  // import utils
  import { get_crowding_color } from "$utils/helper";
  import { kebabCase } from "@urbaninstitute/dataviz-components/utils";
  import { getContext } from "svelte";
  import { steps } from "$utils/scrollySteps";
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

<!-- concentric circles -->
<g
  id="{kebabCase(group)}-concentric-circles"
  opacity={scroll_opacity}
  aria-hidden="true"
  focusable="false"
  tabindex="-1"
>
  {#each Array(3) as _, i}
    <circle
      r={$xGet({ crowd_desig_flipped: i + 1 })}
      fill="none"
      cx={$width / 2}
      cy={$height / 2}
      stroke={scroll_emphasize ? get_crowding_color(i + 1, true) : "#d2d2d2"}
      stroke-width={scroll_emphasize ? 4 : 1}
      stroke-opacity="1"
      stroke-dasharray={scroll_emphasize ? "0" : "4"}
    />
  {/each}
</g>
