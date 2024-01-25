<!--
  @component
  Generates a hover tooltip. It creates a slot with an exposed variable via `let:detail` that contains information about the event. Use the slot to populate the body of the tooltip using the exposed variable `detail`.
  Adapted from LayerCake's Tooltip component with styles from Mitchell Thorson (Urban): https://layercake.graphics/components/Tooltip.html.svelte
-->
<script>
  // props related to event and offset

  /** @type {Object} evt - A svelte event created via [`dispatch`](https://svelte.dev/docs#createEventDispatcher) with event information under `evt.detail.e`. */
  export let evt = {};

  /** @type {Number} [offset=-15] - A y-offset from the hover point, in pixels. */
  export let offset = -15;

  // props related to tooltip style

  /**
   * whether to use a small (138px) or large (198px) width
   * @type {"small" | "large"}
   * @default "small"
   */
  export let size = "small";

  /**
   * @type {"dark" | "light"}
   * @default
   */
  export let style = "dark";

  // lookup to convert semantic sizes to pixel widths
  const sizes = {
    small: 138,
    large: 198,
  };

  // bind to wrapper element
  /**
   * @type {HTMLDivElement}
   */
  let tooltip_el;

  // store width and height of the tooltip
  $: tooltip_width = sizes[size];
  $: tooltip_height = tooltip_el ? tooltip_el.offsetHeight : 20;

  // bound to window height and width
  let window_width = 0;
  let window_height = 0;

  // tooltip triangles are 18px tall for both large and small variants
  const triangle_height = 18;

  /**
   * Calculate which direction the tooltip should go based on the window size and the provided x and y position
   * @param {number} x - the x position of the tooltip
   * @param {number} y - the y position of the tooltip
   */
  function get_tooltip_direction(x, y) {
    if (window_width > 0) {
      // first check if tooltip is too far to the left
      if (x < tooltip_width / 2 && y > 0) {
        return "right";
      }
      // next check if tooltip is too far to the right
      if (x > window_width - tooltip_width / 2 - 18 && y > 0) {
        return "left";
      }
      // next check if tooltip is too far up
      if (y < tooltip_height + triangle_height && y > 0) {
        return "bottom";
      }
    }
    // default to top
    return "top";
  }

  // the direction of the tooltip in relation to the mouse
  // defaults to "top", but will move if the tooltip reaches any edge
  // --based on clientX/Y so the function can detect if the tooltip is close to the client bounds (instead of layerX/Y which is relative to the LayerCake parent)
  $: tooltip_direction = get_tooltip_direction(evt.detail.e.clientX, evt.detail.e.clientY);
</script>

<svelte:window bind:innerWidth={window_width} bind:innerHeight={window_height} />
{#if evt.detail}
  <div
    bind:this={tooltip_el}
    class="tooltip tooltip-{tooltip_direction} tooltip-{style} tooltip-{size}"
    style={`left: ${evt.detail.e.layerX}px; top: ${evt.detail.e.layerY + offset}px; width: ${
      sizes[size]
    }px;`}
  >
    <p class="tooltip-text">
      <span class="tooltip-label"><slot detail={evt.detail} /></span>
    </p>
  </div>
{/if}

<style>
  .tooltip {
    padding: var(--spacing-3) var(--spacing-3) var(--spacing-2) var(--spacing-3);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 500;
    box-shadow: 0px 4px 4px 1px rgba(0, 0, 0, 0.25);
    background: var(--color-gray-shade-lighter, "#FFFFFF");
    pointer-events: none;
    /* transition: transform 0.3s ease-out; */
  }
  .tooltip.tooltip-top {
    transform: translate(-50%, calc(-100% - 10px));
  }
  .tooltip.tooltip-right {
    transform: translate(10px, -50%);
  }
  .tooltip.tooltip-left {
    transform: translate(calc(-100% - 10px), -50%);
  }
  .tooltip.tooltip-bottom {
    transform: translate(-50%, calc(10px));
  }
  .tooltip.tooltip-right .tooltip-text {
    transform: translateX(10px);
  }
  .tooltip.tooltip-bottom .tooltip-text {
    transform: translateY(10px);
  }
  .tooltip p.tooltip-text {
    font-size: var(--font-size-small, 0.75rem);
    font-weight: var(--font-weight-normal, 400);
    line-height: var(--line-height-tight);
    position: relative;
    z-index: 501;
  }
  .tooltip.tooltip-light p.tooltip-text {
    color: var(--color-black, "#000000");
  }
  .tooltip.tooltip-dark p.tooltip-text {
    color: var(--color-white, "#FFFFFF");
  }
  .tooltip-shape {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 500;
  }
</style>
