<!--
  @component
  Crowding text inside the visualization "Crowded in", "Proportional", "Crowded out"
-->
<script context="module">
  const component_name = "RadialCrowdingText";
</script>

<script>
  // import utils
  import { get_radial_path, get_crowding_color } from "$utils/helper";
  import { partialCircle } from "$utils/svg-partial-circle";
  import { kebabCase } from "@urbaninstitute/dataviz-components/utils";
  import { onMount, getContext } from "svelte";
  import { steps } from "$utils/scrollySteps";
  const { width, height, xGet, custom } = getContext("LayerCake");
  let group = getContext("group");

  // check if browser is safari (due to weird path start)
  let isSafari = false;
  onMount(() => {
    if (window) {
      isSafari =
        window.navigator.userAgent.indexOf("Safari") > -1 &&
        window.navigator.userAgent.indexOf("Chrome") === -1 &&
        window.navigator.userAgent.indexOf("Chromium") === -1;
    }
  });

  // SCROLLY
  $: scroll_opacity = 1;
  $: {
    if ($custom.ui_type === "scrolly") {
      scroll_opacity = steps[component_name].active_steps.includes($custom.scroll_index) ? 1 : 0.25;
    }
  }
</script>

<!-- crowding labels -->
<g
  id="{kebabCase(group)}-crowding-labels"
  opacity={scroll_opacity}
  aria-hidden="true"
  focusable="false"
  tabindex="-1"
>
  {#each [{ text: "Crowded In", text2: "In", crowd_desig_flipped: 1.45 }, { crowd_desig_flipped: 2.35, text: "Proportional" }, { crowd_desig_flipped: 3.25, text: "Crowded Out" }] as d, i}
    {@const proportional = i === 1}
    <g>
      <!-- declare path for text to use -->
      <path
        id="{kebabCase(group)}-{$custom.ui_type}-crowding-label-path-{i}"
        d={get_radial_path($xGet(d), $width, $height)}
        fill="none"
        stroke="none"
      />

      <!-- Proportional background color -->
      {#if proportional}
        {@const radius = $xGet({ crowd_desig_flipped: d.crowd_desig_flipped + 0.1 })}
        <!-- push out label length based on width of viz -->
        {@const modifier =
          $width < 340
            ? 13
            : $width < 370
            ? 10
            : $width < 400
            ? 5
            : $width < 450
            ? 1
            : $width < 500
            ? 3.5
            : 0}
        <!-- start/end angle for the label -->
        {@const start_angle = (Math.PI / 180) * (240 - modifier) + (isSafari ? 0.05 : 0)}
        {@const end_angle = (Math.PI / 180) * (300 + modifier) + (isSafari ? 0.025 : 0)}
        <!-- partial circle function thanks to https://github.com/derhuerst/svg-partial-circle -->
        <path
          d={partialCircle($width / 2, $height / 2, radius, start_angle, end_angle)}
          stroke-linecap="round"
          fill="none"
          stroke={proportional ? "#fff3d4" : "var(--color-gray-shade-lightest)"}
          stroke-width={$width < 450 ? "18" : "20"}
          stroke-opacity={0.9}
        />
      {/if}

      <!-- crowding category text -->
      <text
        fill={proportional ? "var(--color-gray-shade-darkest)" : get_crowding_color(i + 1, true)}
        font-size={$width < 450 ? "0.875rem" : "1.0625rem"}
      >
        <textPath
          href="#{kebabCase(group)}-{$custom.ui_type}-crowding-label-path-{i}"
          textLength={d.text.length * ($width < 450 ? 10 : 12)}
          startOffset={(2 * Math.PI * $xGet(d)) / 4}>{d.text.toUpperCase()}</textPath
        >
      </text>
    </g>
  {/each}
</g>

<style>
  text {
    pointer-events: none;
    user-select: none;
    text-anchor: middle;
    font-weight: var(--font-weight-bold);
    paint-order: stroke;
    text-transform: uppercase;
  }
</style>
