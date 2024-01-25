import { describe, it, expect } from "vitest";
import data from "$data/data.json";
import group_count_data from "$data/group-count-data.json";
import industry_data from "$data/industry-data.json";
import occupation_data from "$data/occupation-data.json";

describe("required fields in main data files", () => {
  it("checks required fields in data.json", () => {
    data.forEach((entry, index) => {
      ["code_prefix", "soc", "race_gender_labels", "med_inc_grp", "benchmark_sum"].forEach(
        (field) => {
          expect(entry[field], `Entry ${index + 1} is missing the '${field}' field`).toBeDefined();
        }
      );
    });
  });

  it("checks required fields in occupation-data.json", () => {
    occupation_data.forEach((entry, index) => {
      [
        "soc",
        "name",
        "code_prefix",
        "median_annual_wage",
        "benchmark_sum",
        "wage_benchmark",
        "hours_benchmark",
        "sched_benchmark",
        "takeup_benchmark",
        "retire_benchmark",
        "growth_benchmark",
        "unemployment_benchmark",
        "injury_benchmark",
        "ojt_benchmark",
        "union_benchmark",
        "autonomy_benchmark",
      ].forEach((field) => {
        expect(entry[field], `Entry ${index + 1} is missing the '${field}' field`).toBeDefined();
      });
    });
  });

  it("checks required fields in group-count-data.json", () => {
    group_count_data.forEach((entry, index) => {
      ["race_gender_labels", "below", "above"].forEach((field) => {
        expect(entry[field], `Entry ${index + 1} is missing the '${field}' field`).toBeDefined();
      });
    });
  });

  it("checks required fields in industry-data.json", () => {
    industry_data.forEach((entry, index) => {
      ["code_prefix", "soc_category"].forEach((field) => {
        expect(entry[field], `Entry ${index + 1} is missing the '${field}' field`).toBeDefined();
      });
    });
  });
});

describe("counts are correct in source files", () => {
  it("checks that occupation-data.json has 108 entries", () => {
    expect(occupation_data.length).toBe(108);
  });

  it("checks that data.json has 648 entries (108 jobs x 6 groups)", () => {
    expect(data.length).toBe(648);
  });

  it("checks that group-count-data.json has at least 18 entries (3 categories x 6 groups)", () => {
    expect(group_count_data.length).toBeGreaterThanOrEqual(18);
  });

  it("checks that industry-data.json has 22 entries", () => {
    expect(industry_data.length).toBe(22);
  });
});
