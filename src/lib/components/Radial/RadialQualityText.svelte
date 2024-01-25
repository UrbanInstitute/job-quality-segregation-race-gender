<!--
  @component
  Guides around the top left/right of the visualization to indicate the quality of occupations
-->
<script context="module">
  const component_name = "RadialQualityText";
</script>

<script>
  // import utils
  import { get_radial_path } from "$utils/helper";
  import { kebabCase } from "@urbaninstitute/dataviz-components/utils";
  import { steps } from "$utils/scrollySteps";
  import { getContext } from "svelte";
  const { width, height, xGet, custom } = getContext("LayerCake");
  let group = getContext("group");

  /**
   * @type {number}
   */
  $: radius = $xGet({ crowd_desig_flipped: 4.4 });

  // create a safari detection variable to adjust the text offset
  let is_safari =
    navigator.userAgent.includes("Safari") &&
    !navigator.userAgent.includes("Chrome") &&
    !navigator.userAgent.includes("Chromium");

  // create guides text
  // on safari, there is a slight difference in startOffset on <textPath>
  const guides = [
    {
      text: "← LOWER QUALITY OCCUPATIONS ←",
      offset: is_safari ? "40%" : "42.33%",
      text_anchor: "end",
    },
    {
      text: "→ HIGHER QUALITY OCCUPATIONS →",
      offset: "57.66%",
      text_anchor: "start",
    },
  ];

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
  id="{kebabCase(group)}-quality-text-arc"
  opacity={scroll_opacity}
  aria-hidden="true"
  focusable="false"
  tabindex="-1"
>
  <!-- declare path with unique id -->
  <path
    id="{kebabCase(group)}-{$custom.ui_type}-quality-guide-path"
    d={get_radial_path(radius, $width, $height, false)}
    fill="none"
    stroke="none"
  />
  {#each guides as d}
    <text
      font-size={$width < 450 ? "0.75rem" : "0.875rem"}
      font-weight={scroll_emphasize ? "700" : "400"}
    >
      <textPath
        href="#{kebabCase(group)}-{$custom.ui_type}-quality-guide-path"
        text-anchor={d.text_anchor}
        textLength={d.text.length * ($width < 450 ? 8.5 : 9.5)}
        startOffset={d.offset}>{d.text}</textPath
      >
    </text>
  {/each}
</g>

<style>
  text {
    pointer-events: none;
    user-select: none;
  }
</style>
