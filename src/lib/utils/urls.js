import { base } from "$app/paths";

/** Constants for constructing absolute URLs in different project environemnts. */
export const STAGING_BASE_URL = "https://apps-staging.urban.org";
export const PRODUCTION_BASE_URL = "https://apps.urban.org";

/**
 * @description: Takes a relative project URL and returns one with the base path prepended.
 * @param {string} url - The relative project URL.
 * @return {string} The relative URL with the base path prepended.
 */
export function getProjectUrl(url) {
  return `${base}/${url}`;
}

/**
 * @description: Takes a relative project URL and returns an absolute URL based on the current environment.
 * @param {string} url - The relative project URL
 * @return {string} The resulting absolute URL.
 */
export function getAbsoluteUrl(url) {
  const mode = import.meta.env.MODE;
  if (mode === "production") {
    return `${PRODUCTION_BASE_URL}${getProjectUrl(url)}`;
  }
  if (mode === "staging") {
    return `${STAGING_BASE_URL}${getProjectUrl(url)}`;
  }
  return getProjectUrl(url);
}
