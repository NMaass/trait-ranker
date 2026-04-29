import {
  STORAGE_KEY,
  SCHEMA_VERSION,
  loadProgress,
  saveProgress,
  clearProgress,
  hasResumableProgress,
  createProgress,
  updateSelectionProgress,
} from "../utils/progressManagement";

describe("progressManagement", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("loadProgress returns null when nothing is stored", () => {
    expect(loadProgress()).toBeNull();
  });

  test("saveProgress + loadProgress round-trip preserves data and stamps version", () => {
    const p = createProgress();
    p.data.selection.column1 = ["Empathy", "Discipline"];
    saveProgress(p);
    const loaded = loadProgress();
    expect(loaded).not.toBeNull();
    expect(loaded.version).toBe(SCHEMA_VERSION);
    expect(loaded.data.selection.column1).toEqual(["Empathy", "Discipline"]);
  });

  test("loadProgress drops blobs with a stale version", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: SCHEMA_VERSION + 99, data: {} })
    );
    expect(loadProgress()).toBeNull();
  });

  test("loadProgress migrates from the legacy un-namespaced key", () => {
    const legacyBlob = {
      stage: "selection",
      data: { selection: { column1: ["Curiosity"] } },
    };
    localStorage.setItem("progress", JSON.stringify(legacyBlob));
    const loaded = loadProgress();
    expect(loaded).not.toBeNull();
    expect(loaded.version).toBe(SCHEMA_VERSION);
    expect(loaded.data.selection.column1).toEqual(["Curiosity"]);
    // Legacy key cleared after migration
    expect(localStorage.getItem("progress")).toBeNull();
    // New namespaced key written
    expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull();
  });

  test("clearProgress wipes both keys", () => {
    localStorage.setItem("progress", "{}");
    saveProgress(createProgress());
    clearProgress();
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    expect(localStorage.getItem("progress")).toBeNull();
  });

  test("hasResumableProgress is false on a fresh blob", () => {
    expect(hasResumableProgress(createProgress())).toBe(false);
  });

  test("hasResumableProgress is true once the user has actually moved a trait", () => {
    const p = updateSelectionProgress(createProgress(), {
      column1: ["Empathy"],
      column2: [],
      column3: [],
      selectedTraits: [],
    });
    expect(hasResumableProgress(p)).toBe(true);
  });

  test("hasResumableProgress is true when stage is past selection", () => {
    const p = createProgress();
    p.stage = "ranking";
    expect(hasResumableProgress(p)).toBe(true);
  });
});
