<!--
  @component
  Background area to highlight where a specific node is. Covers the crowding and quality score "coordinates" of the selected job/node 
-->
<script>
  // import utils
  import { kebabCase } from "@urbaninstitute/dataviz-components/utils";
  import { fade } from "svelte/transition";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { getContext } from "svelte";
  const { data, width, height, xGet, zGet, custom } = getContext("LayerCake");
  let group = getContext("group");

  // import stores
  import { selected_occupation, selected_occupation_scrolly } from "$stores/selected_occ_ind";
  import { reducedMotion } from "@urbaninstitute/dataviz-components/stores";

  // SCROLLY
  $: selected_occupation_local = $selected_occupation;
  $: {
    if ($custom.ui_type === "scrolly") {
      selected_occupation_local = $selected_occupation_scrolly;
    }
  }

  // set node radius size
  $: r_size = $width / 90;
  // determine radius based on how many nodes are in the selected_area
  // NICE2HAVE: d3 scaling function
  $: r =
    selected_area_count < 5
      ? r_size * 4
      : selected_area_count < 8
      ? r_size * 5
      : (r_size * selected_area_count + r_size * 2) / (Math.PI / 1.5);

  // declare initial nodes filtered to group and nodes that have a crowding score
  $: initial_nodes = $data
    .filter((d) => d.race_gender_labels === group)
    .filter((d) => d.hasOwnProperty("crowd_desig_chr"))
    .map((d) => ({ ...d }));

  // setup selected_node and selected_index to make sure the nodes have a place to reference
  $: selected_node = null;
  $: selected_area_count = 0;
  $: {
    selected_node = initial_nodes.filter((d) => d.soc === selected_occupation_local)[0];
    if (selected_node) {
      selected_area_count = initial_nodes
        .filter((d) => d.crowd_desig_chr === selected_node.crowd_desig_chr)
        .filter((d) => d.benchmark_sum === selected_node.benchmark_sum).length;
    }
  }

  // create tweened cx/cy values for <circle> coords
  // if ui type is scrolly and css reduced motion is false, set animation duration to 500, otherwise set to 0
  const cx = tweened(0, {
    duration: $custom.ui_type === "scrolly" && !$reducedMotion ? 500 : 0,
    easing: cubicOut,
  });
  const cy = tweened(0, {
    duration: $custom.ui_type === "scrolly" && !$reducedMotion ? 500 : 0,
    easing: cubicOut,
  });

  // when $width is ready, set the tween start to middle of viz
  $: {
    if ($width) {
      cx.set($width / 2);
      cy.set($height / 2);
    }
  }

  // when there is a selected node, get the x/y position
  $: {
    if (selected_node) {
      cx.set(
        $width / 2 +
          Math.cos(
            ((selected_node.benchmark_sum > 5
              ? selected_node.benchmark_sum + 7
              : selected_node.benchmark_sum + 6) /
              12) *
              2 *
              Math.PI -
              Math.PI / 2
          ) *
            $xGet(selected_node)
      );

      cy.set(
        $height / 2 +
          Math.sin(
            ((selected_node.benchmark_sum > 5
              ? selected_node.benchmark_sum + 7
              : selected_node.benchmark_sum + 6) /
              12) *
              2 *
              Math.PI -
              Math.PI / 2
          ) *
            $xGet(selected_node)
      );
    }
  }
</script>

<g id="{kebabCase(group)}-background-circle" aria-hidden="true" focusable="false">
  {#if selected_node}
    <circle
      aria-hidden="true"
      focusable="false"
      transition:fade={{ duration: 500 }}
      {r}
      fill={$zGet(selected_node)}
      fill-opacity={0.25}
      cx={$cx}
      cy={$cy}
    />
  {/if}
</g>

<style>
  circle {
    transition: opacity 0.5s ease-in-out;
  }
</style>
