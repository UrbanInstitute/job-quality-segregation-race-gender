import { derived, writable } from "svelte/store";
import industry_data from "$data/industry-data.json";
import occupation_data from "$data/occupation-data.json";
import data from "$data/data.json";

// selected industry/occupation stores
export const selected_industry = writable("47");
export const selected_occupation = writable("472100");

// derived store of all related info based on selected industry
export const selected_industry_data = derived(selected_industry, ($selected_industry) => {
  return industry_data.find((d) => d.code_prefix === $selected_industry);
});

// derived store of all related info based on selected occupation
export const selected_occupation_data = derived(selected_occupation, ($selected_occupation) => {
  return occupation_data.find((d) => d.soc === $selected_occupation);
});

// derived store of occupation data based on all groups
export const group_selected_occupation_data = derived(
  selected_occupation,
  ($selected_occupation) => {
    return data.filter((d) => d.soc === $selected_occupation);
  }
);

// copy of selected occupation store to use in scrolly
export const selected_occupation_scrolly = writable("");
