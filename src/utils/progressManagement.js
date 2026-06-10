const STORAGE_KEY = "trait-ranker:progress";
const LEGACY_STORAGE_KEY = "progress";
const SCHEMA_VERSION = 1;

// Create an empty progress object that tracks each stage of the app
function createProgress() {
  return {
    version: SCHEMA_VERSION,
    stage: "selection",
    date: Date.now(),
    data: {
      selection: {
        column1: [],
        column2: [],
        column3: [],
        selectedTraits: [],
        // Colors are intentionally NOT persisted — they derive from
        // `hasRestarted` + the theme at render time, so palette changes
        // apply to old sessions automatically.
        hasRestarted: false,
      },
      ranking: {
        currentMatch: null,
        currentStanding: [],
        isComplete: false,
        progressPercent: 0,
        comparisonStack: [],
        mergeStack: [],
        totalComparisons: 0,
        comparisonsMade: 0,
      },
      results: {
        traits: [],
      },
    },
  };
}
function updateSelectionProgress(progress, selectionData) {
  const base = progress || createProgress();
  return {
    ...base,
    version: SCHEMA_VERSION,
    stage: "selection",
    date: Date.now(),
    data: {
      ...base.data,
      selection: {
        ...base.data.selection,
        ...selectionData, // Updated data from the selection phase
      },
    },
  };
}
function updateRankingProgress(progress, rankingData) {
  const base = progress || createProgress();
  return {
    ...base,
    version: SCHEMA_VERSION,
    stage: "ranking",
    date: Date.now(),
    data: {
      ...base.data,
      ranking: {
        ...base.data.ranking,
        ...rankingData, // Updated data from the ranking phase
      },
    },
  };
}
function updateResultsProgress(progress, resultsData) {
  const base = progress || createProgress();
  return {
    ...base,
    version: SCHEMA_VERSION,
    stage: "results",
    date: Date.now(),
    data: {
      ...base.data,
      results: {
        ...base.data.results,
        ...resultsData, // Updated data from the results phase
      },
    },
  };
}

// Save progress object to browser localStorage
function saveProgress(progress) {
  try {
    const withVersion = { ...progress, version: SCHEMA_VERSION };
    const serialized = JSON.stringify(withVersion);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (e) {
    console.error("Failed to save progress", e);
  }
}

// Load progress object from localStorage. Migrates the old un-namespaced key
// once, and drops anything written under a different schema version.
function loadProgress() {
  try {
    let serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) {
      const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacy) {
        try {
          // Best-effort migration: re-write under the new key, drop the old.
          const parsed = JSON.parse(legacy);
          if (parsed && typeof parsed === "object") {
            const migrated = { ...parsed, version: SCHEMA_VERSION };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
            serialized = JSON.stringify(migrated);
          }
        } catch (_) {
          /* ignore corrupt legacy blob */
        }
        try {
          localStorage.removeItem(LEGACY_STORAGE_KEY);
        } catch (_) {
          /* ignore */
        }
      }
    }
    if (!serialized) return null;
    const parsed = JSON.parse(serialized);
    if (!parsed || parsed.version !== SCHEMA_VERSION) return null;
    return parsed;
  } catch (e) {
    console.error("Failed to load progress", e);
    return null;
  }
}

// Wipe stored progress — used by the Home button and the "Start over" CTA.
function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear progress", e);
  }
}

// Has the user got an in-progress (or completed) session worth resuming?
function hasResumableProgress(progress) {
  if (!progress || progress.version !== SCHEMA_VERSION) return false;
  if (progress.stage === "ranking" || progress.stage === "results") return true;
  const sel = progress.data?.selection;
  if (!sel) return false;
  // Any movement out of column2 means the user has actually started.
  return (
    (sel.column1?.length || 0) > 0 ||
    (sel.column3?.length || 0) > 0 ||
    !!sel.hasRestarted
  );
}

export {
  STORAGE_KEY,
  SCHEMA_VERSION,
  createProgress,
  updateSelectionProgress,
  updateRankingProgress,
  updateResultsProgress,
  saveProgress,
  loadProgress,
  clearProgress,
  hasResumableProgress,
};
