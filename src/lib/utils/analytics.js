/**
 * refers to the entire viz component this project fuels
 * this should be set manually for each project
 */
let dataviz_title = "job-quality-segregation-race-gender";

// boolean to prevent analytics from firing in dev
const DEV = true;

if (!dataviz_title) {
  console.warn("Hello! Please set your analytics dataviz_title in src/utils/analytics.js!");
}
/**
 * sends event data to GTM and GA. call in event handlers for each event type you wish to track.
 * @param {Node} target the div experiencing this click, which is accessed differently depending on the handler's event structure
 * @param {String} data a string in the format "what's_happening--click_specifics" where "what's_happening is the type of click, such as "map_click" or "dropdown_select" and "click_specifics" refers to the selected option, region, or specific function.
 */
export let logClickToGA = (target, data) => {
  if (!DEV) {
    // @ts-ignore
    if (typeof window === "undefined" || !window.gtag) return;
    // @ts-ignore
    window.gtag("event", "dataviz_click", {
      dataviz_title: dataviz_title,
      dataviz_target: target,
      dataviz_detail: data,
    });
  }
};

/**
 * sets the unique analytics title for the project. call this onload.
 * @param {string} title the unique analytics slug for this project.
 */
export let setDatavizTitle = (title) => {
  dataviz_title = title;
};
