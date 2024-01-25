/**
 * @param {number|string} x crowding category number
 */
export function get_crowding_label(x, flipped = false) {
  let output;
  if (flipped) {
    switch (x) {
      case 3:
      case "3":
        output = "Crowded Out";
        break;
      case 2:
      case "2":
        output = "Proportional";
        break;
      case 1:
      case "1":
        output = "Crowded In";
        break;
      default:
        break;
    }
  } else {
    switch (x) {
      case 1:
      case "1":
        output = "Crowded Out";
        break;
      case 2:
      case "2":
        output = "Proportional";
        break;
      case 3:
      case "3":
        output = "Crowded In";
        break;
      default:
        break;
    }
  }
  return output;
}

/**
 * @param {number|string} x crowding category number
 */
export function get_crowding_color(x, flipped = false) {
  let output;

  if (flipped) {
    switch (x) {
      case 3:
      case "3":
        output = "var(--color-blue)";
        break;
      case 2:
      case "2":
        output = "var(--color-yellow)";
        break;
      case 1:
      case "1":
        output = "var(--color-blue-shade-darker)";
        break;
      default:
        break;
    }
  } else {
    switch (x) {
      case 1:
      case "1":
        output = "var(--color-blue)";
        break;
      case 2:
      case "2":
        output = "var(--color-yellow)";
        break;
      case 3:
      case "3":
        output = "var(--color-blue-shade-darker)";
        break;
      default:
        break;
    }
  }

  return output;
}

/**
 * create a radial path based on a given radius
 * based on this article, rotated to start at 6 o'clock (down) or 9 o'clock (left)
 * https://jh3y.medium.com/circular-text-with-css-cf374de94435
 * @param {number} r radius
 * @param {number} w width
 * @param {number} h height
 */
export const get_radial_path = (r, w, h, flip = true) => {
  let left = `M ${w / 2 - r},${h / 2}
  a ${r},${r} 0 1,1 ${2 * r},0
  ${r},${r} 0 1,1 ${-2 * r},0`;

  let down = `M ${w / 2},${h / 2 + r}
    a ${r},${r} 0 1,1 0,${-2 * r}
    a ${r},${r} 0 1,1 0,${2 * r}`;

  return flip ? left : down;
};
