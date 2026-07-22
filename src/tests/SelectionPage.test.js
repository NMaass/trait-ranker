import React from "react";
import { render, act } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import SelectionPage from "../components/Selection/SelectionPage";
import appTheme from "../style/appTheme";
import { ProgressContext, UndoContext, TutorialContext } from "../components/App";

// Isolate the SelectionPage decision logic from the drag surface and the fade
// tutorial — those are presentation; the thresholds under test live in the
// page itself (handleClearStack).
jest.mock("../components/Selection/SelectionDroppable", () => {
  const Mock = () => <div data-testid="droppable" />;
  return Mock;
});
jest.mock("../utils/FadeTextSeries", () => {
  const Mock = () => <div />;
  return Mock;
});

const col = (id, traitIds) => ({ id, title: id, traitIds });

const buildColumnData = ({ c1 = [], c2 = [], c3 = [] }) => ({
  columns: {
    column1: col("column1", c1),
    column2: col("column2", c2),
    column3: col("column3", c3),
  },
});

// One renderer so every test gets the app theme (SelectionPage reads
// theme.palette.custom — without the provider, useTheme throws) and the same
// set of shared contexts the page consumes.
const renderSelection = (overrides = {}) => {
  const undoRef = { current: null };
  const setActiveStepState = jest.fn();
  const history = { push: jest.fn(), replace: jest.fn() };
  const setColumnData = jest.fn();
  const setTopTraits = overrides.setTopTraits ?? jest.fn();
  const onSwipe = jest.fn();
  const setProgressData = jest.fn();
  const utils = render(
    <ThemeProvider theme={appTheme}>
      <ProgressContext.Provider
        value={{
          progress: [0, jest.fn()],
          activeStep: [overrides.activeStep ?? 0, setActiveStepState],
        }}
      >
        <UndoContext.Provider value={{ undoFunction: undoRef }}>
          <TutorialContext.Provider value={{ tutorialStrings: [[], jest.fn()] }}>
            <SelectionPage
              columnData={overrides.columnData ?? buildColumnData({ c2: ["x"] })}
              setColumnData={overrides.setColumnData ?? setColumnData}
              setTopTraits={setTopTraits}
              history={history}
              swipeHandlers={{}}
              onSwipe={onSwipe}
              topTraits={overrides.topTraits ?? []}
              progressData={overrides.progressData ?? null}
              setProgressData={overrides.setProgressData ?? setProgressData}
            />
          </TutorialContext.Provider>
        </UndoContext.Provider>
      </ProgressContext.Provider>
    </ThemeProvider>
  );
  return {
    ...utils,
    history,
    setColumnData,
    setTopTraits,
    setProgressData,
    setActiveStepState,
    undoRef,
  };
};

describe("SelectionPage end-of-selection logic", () => {
  test("navigates to /Rank with the valued pile when 7-24 traits kept", () => {
    const kept = Array.from({ length: 10 }, (_, i) => `t${i}`);
    const columnData = buildColumnData({ c2: [], c3: kept });
    const { history, setTopTraits, setActiveStepState } = renderSelection({
      columnData,
    });

    expect(setTopTraits).toHaveBeenCalledWith(kept);
    expect(setActiveStepState).toHaveBeenCalledWith(1);
    expect(history.push).toHaveBeenCalledWith("/Rank");
  });

  test("re-shuffles the disliked pile back when fewer than 7 kept", () => {
    const disliked = ["a", "b", "c"];
    const columnData = buildColumnData({ c1: disliked, c2: [], c3: ["x"] });
    const setColumnData = jest.fn();
    renderSelection({ columnData, setColumnData });

    expect(setColumnData).toHaveBeenCalled();
    const call = setColumnData.mock.calls[0][0];
    const next = typeof call === "function" ? call(columnData) : call;
    expect(next.columns.column2.traitIds).toEqual(disliked);
  });

  test("starts the restart (loved) pass when more than 24 kept", () => {
    const kept = Array.from({ length: 25 }, (_, i) => `k${i}`);
    const columnData = buildColumnData({ c2: [], c3: kept });
    const setColumnData = jest.fn();
    renderSelection({ columnData, setColumnData });

    expect(setColumnData).toHaveBeenCalled();
    const call = setColumnData.mock.calls[0][0];
    const next = typeof call === "function" ? call(columnData) : call;
    expect(next.columns.column2.traitIds).toEqual(kept);
  });

  test("registers an undo handler that callers can invoke", () => {
    const columnData = buildColumnData({ c2: ["x"] });
    const { undoRef } = renderSelection({ columnData });

    // The page publishes its undo handler on the shared ref so the bottom
    // UndoButton can call it; it should be callable without throwing.
    expect(undoRef.current).toBeInstanceOf(Function);
    expect(() =>
      act(() => {
        undoRef.current();
      })
    ).not.toThrow();
  });
});