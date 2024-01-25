<!--
  @component Table cell for IntroOccupationTable.svelte
-->
<script>
  import { get_crowding_color, get_crowding_label } from "$utils/helper";
  import { kebabCase } from "@urbaninstitute/dataviz-components/utils";

  /**
   * radius
   * @type {number}
   */
  export let r;

  /**
   * data (d)
   * @type {{ crowd_desig_chr: string; race_gender_labels: any; }}
   */
  export let d;

  /**
   * @type {string}
   */
  export let occ;
</script>

<svg
  width={r}
  height={r}
  overflow="visible"
  aria-labelledby="{kebabCase(d.race_gender_labels)}-{kebabCase(occ)}"
  focusable="false"
>
  <title id="{kebabCase(d.race_gender_labels)}-{kebabCase(occ)}"
    >{get_crowding_label(d.crowd_desig_chr)}</title
  >
  <circle cx={r / 2} cy={r / 2} r={r / 2} fill={get_crowding_color(d.crowd_desig_chr)} />
</svg>
<div>{d.race_gender_labels}</div>
