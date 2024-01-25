<!--
  @component
  LayerCake-base Radial visualization parent component, consistening of Nodes, guides, text, and a tooltip
-->
<script>
  // import utils
  import { Html, LayerCake, Svg } from "layercake";
  import { scaleOrdinal, scaleLinear } from "d3-scale";
  import { getContext } from "svelte";
  let group = getContext("group");

  // import components
  import Nodes from "./RadialNodes.svelte";
  import NodeArea from "./RadialNodeArea.svelte";
  import QualityNums from "./RadialQualityNums.svelte";
  import CrowdingCircles from "./RadialCrowdingCircles.svelte";
  import QualityText from "./RadialQualityText.svelte";
  import QualityGuides from "./RadialQualityGuides.svelte";
  import CrowdingText from "./RadialCrowdingText.svelte";
  import Tooltip from "./RadialTooltip.html.svelte";

  // import data
  import data from "$data/data.json";
  import group_count_data from "$data/group-count-data.json";
  import { get_radial_label } from "$utils/ariaLabelRadial";

  /**
   * UI context for where this chart can be placed
   * @type {string}
   * @param {('card'|'scrolly')} operator
   */
  export let ui_type = "card";

  export let scroll_index = 0;

  // declare width and set height to it (make it square)
  $: clientWidth = 0;
  $: chart_height = clientWidth;

  // get summary info for aria label
  let d = group_count_data
    .filter((d) => d.race_gender_labels === group)
    .sort((a, b) => a.crowding_label - b.crowding_label);

  // get label and description for aria label
  let label = get_radial_label(d, group);

  // declare tooltip variables
  /**
   * @type {CustomEvent<any>}
   */
  let evt;
  let hideTooltip = true;
</script>

<div class="chart-container" bind:clientWidth style:height="{chart_height}px">
  {#if chart_height}
    <LayerCake
      {data}
      x={"crowd_desig_flipped"}
      y={"benchmark_sum"}
      r={"benchmark_sum"}
      z={"crowd_desig_chr"}
      xDomain={[0.05, 9.5]}
      yDomain={[0, 12]}
      zRange={["var(--color-blue)", "var(--color-yellow)", "var(--color-blue-shade-darker)"]}
      xScale={scaleLinear()}
      yScale={scaleLinear()}
      zScale={scaleOrdinal()}
      custom={{ ui_type: ui_type, scroll_index: scroll_index }}
    >
      <Svg {label}>
        <g role="presentation">
          <CrowdingCircles />
          <QualityGuides />
          <CrowdingText />
          <NodeArea />
          <Nodes
            on:mousemove={(e) => (evt = hideTooltip = e)}
            on:mouseout={() => (hideTooltip = true)}
          />
          <QualityNums />
          <QualityText />
        </g>
      </Svg>
      <Html pointerEvents={false}>
        {#if hideTooltip !== true}
          <Tooltip {evt} let:detail size="large" style="light">
            {detail.props.name}
          </Tooltip>
        {/if}
      </Html>
    </LayerCake>
  {/if}
</div>

<style>
  .chart-container {
    width: 100%;
  }

  /* opacity transitions for svg elements within */
  .chart-container :global(g) {
    transition: opacity 0.5s ease-in-out;
  }

  .chart-container :global(circle) {
    transition: opacity 0.5s ease-in-out;
  }

  .chart-container :global(line) {
    transition: opacity 0.5s ease-in-out;
  }
</style>
