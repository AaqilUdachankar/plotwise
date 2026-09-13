/**
 * Lightweight localStorage helpers used instead of mandatory authentication.
 * Powers "Recent searches" and the optional "Saved Analysis" feature.
 */

const RECENT_KEY = "plotwise_recent_searches";
const SAVED_KEY = "plotwise_saved_analyses";
const MAX_RECENT = 6;

function readList(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeList(key, list) {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch {
    // localStorage unavailable (private mode, quota, etc.) - fail silently
  }
}

export function getRecentSearches() {
  return readList(RECENT_KEY);
}

export function addRecentSearch(city) {
  const list = readList(RECENT_KEY).filter((c) => c.slug !== city.slug);
  list.unshift({ name: city.name, slug: city.slug, state: city.state });
  writeList(RECENT_KEY, list.slice(0, MAX_RECENT));
}

export function getSavedAnalyses() {
  return readList(SAVED_KEY);
}

export function isAreaSaved(areaId) {
  return readList(SAVED_KEY).some((a) => a.areaId === areaId);
}

export function toggleSavedAnalysis(entry) {
  const list = readList(SAVED_KEY);
  const exists = list.some((a) => a.areaId === entry.areaId);
  const next = exists ? list.filter((a) => a.areaId !== entry.areaId) : [{ ...entry, savedAt: new Date().toISOString() }, ...list];
  writeList(SAVED_KEY, next);
  return !exists;
}

export function removeSavedAnalysis(areaId) {
  const list = readList(SAVED_KEY).filter((a) => a.areaId !== areaId);
  writeList(SAVED_KEY, list);
}
