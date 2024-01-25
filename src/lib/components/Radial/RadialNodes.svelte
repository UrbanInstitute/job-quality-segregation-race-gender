<!--
  @component
  Individual nodes for the radial visualization, representing jobs
-->
<script context="module">
  const component_name = "RadialNodes";
</script>

<script>
  // import utils
  import { forceSimulation, forceCollide } from "d3-force";
  import { kebabCase } from "@urbaninstitute/dataviz-components/utils";
  import { fade } from "svelte/transition";
  import { raise } from "layercake";
  import { logClickToGA } from "$utils/analytics";
  import { getContext } from "svelte";
  const { data, width, height, xGet, zGet, custom } = getContext("LayerCake");
  let group = getContext("group");
  import { createEventDispatcher } from "svelte";

  // in order to assign a discrete angle to each node, we need to use the radialForce Philippe Rivière has developed
  import { forceRadial } from "$utils/forceRadial.js"; //https://observablehq.com/d/9187c989f882beee

  // import data
  import occupation_data from "$data/occupation-data.json";

  // import stores
  import {
    selected_occupation,
    selected_industry,
    selected_occupation_scrolly,
  } from "$stores/selected_occ_ind";
  import { steps } from "$utils/scrollySteps";

  const dispatch = createEventDispatcher();

  // SCROLLY OCCUPATION
  $: selected_occupation_local = $selected_occupation;
  $: {
    if ($custom.ui_type === "scrolly") {
      selected_occupation_local = $selected_occupation_scrolly;
    }
  }

  // set node radius size
  $: r_size = $width / 90;

  // init data
  /**
   * @type {any[]}
   */
  let nodes = [];

  // declare initial nodes filtered to group and nodes that have a crowding score
  const initial_nodes = $data
    .filter((/** @type {{ race_gender_labels: any; }} */ d) => d.race_gender_labels === group)
    .filter((/** @type {{ crowd_desig_chr: any }} */ d) => d.hasOwnProperty("crowd_desig_chr"))
    .map((/** @type {any} */ d) => ({ ...d }));

  // setup selected_node and selected_index to make sure the nodes have a place to reference
  $: selected_index = null;

  $: {
    // find index of node in selected_occupation
    selected_index = initial_nodes.findIndex(
      (/** @type {{ soc: string; }} */ d) => d.soc === selected_occupation_local
    );

    // if there is an index
    if (selected_index !== -1) {
      // remove from current position
      let selected_occ = initial_nodes.splice(selected_index, 1)[0];

      // add to the end of the array
      initial_nodes.push(selected_occ);
    }
  }

  // declare the simulation and set nodes
  const simulation = forceSimulation(initial_nodes);
  simulation.on("tick", () => {
    nodes = simulation.nodes();
  });

  // in a reactive context, setup the simulation
  $: {
    simulation
      .force(
        "charge",
        forceCollide().radius((/** @type {{ soc: string; }} */ d) => {
          return d.soc === selected_occupation_local
            ? r_size * 2 + (r_size < 5 ? 0.5 : 1)
            : r_size + (r_size < 5 ? 0.5 : 1);
        })
      )
      .force(
        "radial",
        forceRadial()
          .radius((/** @type {any} */ d) => $xGet(d))
          .x($width / 2)
          .y($height / 2)
          .angle((/** @type {{ benchmark_sum: number; }} */ d) => {
            return (
              (360 / 12) * (d.benchmark_sum > 5 ? d.benchmark_sum + 1 : d.benchmark_sum) -
              (360 / 12) * 9
            );
          })
      )
      .alpha(1)
      .tick(100)
      .restart();
  }

  // SCROLLY
  $: scroll_opacity = 1;
  $: scroll_deemphasize = false;
  $: {
    if ($custom.ui_type === "scrolly") {
      scroll_opacity = steps[component_name].active_steps.includes($custom.scroll_index) ? 1 : 0.5;
      scroll_deemphasize = steps[component_name].deemphasize_steps.includes($custom.scroll_index);
    }
  }

  // utility function for getting the occupation name
  function get_occ_name(/** @type {{ soc: string; }} */ d) {
    return occupation_data.find((/** @type {{ soc: string; }} */ f) => f.soc === d.soc)?.name;
  }
</script>

<g id="{kebabCase(group)}-nodes" aria-hidden="true" focusable="false" tabindex="-1">
  <!-- nodes -->
  {#each nodes as d}
    <!-- node callout flag (annotate) -->
    {@const annotate = d.soc === selected_occupation_local}
    <!-- node begin -->
    <circle
      role="presentation"
      aria-hidden="true"
      focusable="false"
      tabindex="-1"
      on:click={(e) => {
        dispatch("click", { e, props: d });
        // if clicking on a new node, remove the special styling due to a bug (it will be added back on next render)
        if (!annotate && e.target) {
          e.target.setAttribute("r", r_size);
          e.target.style.stroke = null;
        }
        raise(e.target);
        selected_industry.set(d.code_prefix);
        selected_occupation.set(d.soc);
        let selected_occ_name = get_occ_name(d);
        logClickToGA(e.target, `radial_viz_node_click--${selected_occ_name}`);
      }}
      on:touchend={(e) => {
        dispatch("touchend", { e, props: d });
        raise(e.target);
        selected_industry.set(d.code_prefix);
        selected_occupation.set(d.soc);
        let selected_occ_name = get_occ_name(d);
        logClickToGA(e.target, `radial_viz_node_click--${selected_occ_name}`);
      }}
      on:mouseenter={(e) => {
        let selected_occ_name = get_occ_name(d);
        dispatch("mouseenter", { e, props: { ...d, name: selected_occ_name } });
        raise(e.target);
        if (!annotate && e.target) {
          e.target.setAttribute("r", r_size * 2 + (r_size < 5 ? 0.5 : 1));
          e.target.style.stroke = "#ffffff";
        }
      }}
      on:mousemove={(e) => {
        let selected_occ_name = get_occ_name(d);
        dispatch("mousemove", { e, props: { ...d, name: selected_occ_name } });
      }}
      on:mouseout={(e) => {
        dispatch("mouseout", { e, props: d });
        if (!annotate) {
          e.target.setAttribute("r", r_size);
          e.target.style.stroke = null;
        }
      }}
      on:blur={(e) => {
        dispatch("blur", { e, props: d });
        if (!annotate) {
          e.target.setAttribute("r", r_size);
          e.target.style.stroke = null;
        }
      }}
      class="node"
      r={annotate ? r_size * 2 : r_size}
      fill={$zGet(d)}
      fill-opacity={1}
      stroke={annotate ? "#ffffff" : null}
      stroke-width={r_size < 5 ? 2 : 3}
      cx={d.x}
      cy={d.y}
      opacity={annotate ? 1 : scroll_deemphasize ? 0.25 : scroll_opacity}
      transition:fade={{ duration: 500 }}
    />
  {/each}
</g>

<style>
  circle {
    cursor: pointer;
    transition: r 0.5s ease-in-out;
  }

  circle:focus {
    outline: none;
  }
</style>
