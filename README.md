# Getting a Good Job Depends More on Race and Gender than Education

## Project Details

Svelte app for the job quality/segregation project, January 2024. This project is a single page SvelteKit application that uses [`svelte-scroller`](https://github.com/sveltejs/svelte-scroller), [`Layer Cake`](https://layercake.graphics/), and [`d3-force`](https://d3js.org/d3-force/simulation) to create a scrollytelling page featuring a unique radial visualization.

Data Visualization and Development: Ben Kates

Designer: Brittney Spinner

Writer: Wes Jenkins

Research team: Ofronama Biu, Batia Katz, Afia Adu-Gyamfi, Molly M. Scott

## Hosting Location

Production: https://apps.urban.org/features/job-quality-segregation-race-gender/

## Data (`src/data/`)

The project uses several data files:

- [`data.json`](src/data/data.json): All 108 jobs and associated metrics for each of the six groups.
- [`occupation-data.json`](src/data/occupation-data.json): Names and metadata for each occupation
- [`industry-data.json`](src/data/industry-data.json): Names and metadata for each industry (occupation group)
- [`group-count-data.json`](src/data/group-count-data.json): Summarized occupation count of crowding categories for each of the six groups, split by above/below quality occupations
- [`aria-label-radial-data.json`](src/data/aria-label-radial-data.json): `aria-label` for each of the radial charts in the six `Card` components
- [`credits-data.json`](src/data/credits-data.json): Project credits
- [`indicator-names.json`](src/data/indicator-names.json): List of 11 indicators

## Components (`src/lib/components/`)

Components found in this single page application `src/routes/+page.svelte`. These are the components/folders that contain the content-specific features of the page:

- [`Intro`](src/lib/components/Intro/Intro.svelte): Introduction paragraphs
- [`Scrolly`](src/lib/components/Scrolly/Scrolly.svelte): Scrollytelling section, including infographic
- [`Occupation`](src/lib/components/Occupation/Occupation.svelte): Occupation section above "tool" section, title and indicator list with scores for each
- [`Card`](src/lib/components/Card/Card.svelte): Card for the "tool" section of the page
- [`Radial`](src/lib/components/Radial/Radial.svelte): Layer Cake-based Radial visualization consisting of nodes, guides, and lines
- [`Footer`](src/lib/components/Footer/Footer.svelte): About, data sources, and credits

### `@urbaninstitute/dataviz-components`

This project uses `v0.3.1` of the open source [@urbaninstitute/dataviz-components](https://www.npmjs.com/package/@urbaninstitute/dataviz-components) library, consisting of Svelte components and helper functions/stores.

### Scrollytelling (`src/lib/components/Scrolly/`)

This project uses [`svelte-scroller`](https://github.com/sveltejs/svelte-scroller) from Rich Harris to create the scrollytelling section of the page. The only change in approach in this project is the padding of the foreground determines space between foreground steps (not view height aka `vh`).

See `src/lib/utils/scrollySteps.js` for the metadata of active/emphasized `Radial` layers.

### Radial Visualization (`src/lib/components/Radial/`)

This project uses [Layer Cake](https://layercake.graphics/) to maintain scales and placement of components for the radial visualization. See `Radial.svelte` for the definition of scales (x/y/color) and custom props that are passed down via Svelte context. The `Card` component declares the context for the specific race/gender "group".

[`d3-force`](https://d3js.org/d3-force/simulation) is utilized in the `RadialNodes` component, which uses a [custom `forceRadial`](https://observablehq.com/d/9187c989f882beee) function to add an angular offset to the radial layout. This is necessary to maintain the "pie" shape of the visualization, as the default `d3.forceRadial` function does not allow for this. See the "Utility Functions" section in this README for more info.

In order to create the many layers of the visualization, the child components of `Radial` are:

- `RadialCrowdingCircles`: Background circles for each crowding designation (concentric circles starting from the center working out)
- `RadialQualityGuides`: Background lines for each quality score 1-10
- `RadialCrowdingText`: Crowding designation text within circles crowding circles (ie: "Crowded Out", "Proportional", "Crowded In")
- `RadialNodeArea`: Circular background area for a particular quality score and crowding designation coordinate, based on the selected occupation
- `RadialNodes`: 108 nodes for each occupation
- `RadialQualityNums`: Quality score numbers 1-10
- `RadialQualityText`: Guiding text for quality score direction, placed on outermost circles

These components reference the `custom` Layer Cake context, to determine the UI type (scrolly vs. card) and the scroll index (current step in the scrolly). Additionally, `RadialTooltip.html.svelte` has been added for tooltip functionality in the `<Html>` child of the Layer Cake parent.

## Svelte Stores (`src/lib/stores/`)

`selected_occ_ind.js`: Stores for the selected occupation and industry (occupation group), along with derived stores for derived metadata.

## Utility Functions (`src/lib/utils/`)

- [`ariaLabelRadial.js`](src/lib/utils/ariaLabelRadial.js): Renders a dynamic `aria-label` based on `src/data/aria-label-radial-data.json`
- [`forceRadial.js`](src/lib/utils/forceRadial.js): Replacement for d3's `forceRadial` that adds angular offset (from this [Observable notebook](https://observablehq.com/d/9187c989f882beee) by
  Philippe Rivière aka Fil)
- [`helper.js`](src/lib/utils/helper.js): Helper functions for getting a crowding label/color based on crowding designation number as well as a "radial path" that draws a circle based on a given width/height and radius
- [`scrollySteps.js`](src/lib/utils/scrollySteps.js): Metadata for active/emphasized steps of `Radial` layers
- [`svg-partial-circle.js`](src/lib/utils/svg-partial-circle.js): Renders a partial circular path for use in the background text of "Proportional" label in `RadialCrowdingText.svelte`, adapted from [Jannis R's repo](https://github.com/derhuerst/svg-partial-circle)

### svelte-textfit

In order to maintain consistent height for dynamic text (namely long occupation titles) and not affect the user experience, this project uses an external Svelte package [`svelte-textfit`](https://github.com/micha-lmxt/svelte-textfit). This package is based on `react-textfit`.

This has been copied locally to maintain specific Svelte 4 features in the following locations:

- `utils/text-fit/text-fit-action.js`
- `utils/text-fit`

## Developing

To set up the project locally, install dependencies and run:

```sh
npm install
npm run dev
```
