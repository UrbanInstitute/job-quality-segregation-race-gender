import aria_label_radial_data from "$data/aria-label-radial-data.json";
/**
 * get aria label for radial chart
 * @param {{ above: number,below: number }[]} d
 * @param {string} group
 */
export const get_radial_label = (d, group) => {
  // get sum of jobs (only first three objects since fourth is NA)
  const sum = d.slice(0, 3).reduce((acc, e) => acc + e.above + e.below, 0);
  const intro = `Across ${sum} occupations, ${group} are `;

  // @ts-ignore
  let text = aria_label_radial_data.find((e) => e.group === group).text;

  return intro + text;
};
