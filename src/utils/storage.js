/**
 * Small, safe localStorage helpers.
 * They keep malformed/old browser data from crashing the app.
 */
export function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore storage failures (private mode/quota/etc.).
  }
}
