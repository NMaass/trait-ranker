// @flow
import React, {
  useEffect,
  useContext,
  useRef,
  useState,
  useCallback,
} from "react";
import SelectionDroppable from "./SelectionDroppable";
import { Box, Grid } from "@mui/material";
import { ProgressContext } from "../App";
import { TutorialContext } from "../App";
import { SkipSelectionButton } from "../../utils/devTools";
import { UndoContext } from "../App";
import FadeTextSeries from "../../utils/FadeTextSeries";
import { updateSelectionProgress } from "../../utils/progressManagement";
const SelectionPage = ({
  columnData,
  setColumnData,
  setTopTraits,
  history,
  swipeHandlers,
  topTraits,
  progressData,
  setProgressData,
}) => {
  useEffect(() => {
    if (columnData.columns.column2.traitIds.length === 0) {
      handleClearStack();
    }
    // We only react to columnData here; the inner handler reads the latest
    // column1 length itself, so other deps would just over-fire.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnData]);

  const { progress, activeStep } = useContext(ProgressContext);
  const [progressState, setProgressState] = progress;
  const [activeStepState, setActiveStepState] = activeStep;
  const { tutorialStrings } = useContext(TutorialContext);
  const [tutorialStringsState, setTutorialStringsState] = tutorialStrings;
  const numberOfTraits = useRef(columnData.columns.column2.traitIds.length);
  const { undoFunction } = useContext(UndoContext);
  const isUndoing = useRef(false);
  const [shouldSlideUp, setShouldSlideUp] = useState(false);

  const [selectionHistory, setSelectionHistory] = useState([]);

  const [leftDroppableColor, setLeftDroppableColor] = useState(
    progressData?.data?.selection?.leftDroppableColor || "LightPink"
  );
  const [rightDroppableColor, setRightDroppableColor] = useState(
    progressData?.data?.selection?.rightDroppableColor || "LightGreen"
  );

  const [hasRestarted, setHasRestarted] = useState(
    !!progressData?.data?.selection?.hasRestarted
  );

  // Load saved selection progress on mount
  useEffect(() => {
    if (progressData?.data?.selection) {
      setColumnData((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          column1: {
            ...prev.columns.column1,
            traitIds: progressData.data.selection.column1 || [],
          },
          column2: {
            ...prev.columns.column2,
            traitIds: progressData.data.selection.column2 || [],
          },
          column3: {
            ...prev.columns.column3,
            traitIds: progressData.data.selection.column3 || [],
          },
        },
      }));
      if (progressData.data.selection.selectedTraits?.length) {
        setTopTraits(progressData.data.selection.selectedTraits);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (columnData.columns.column2.traitIds.length === 0) return;
    const remainingTraits = columnData.columns.column2.traitIds.length;
    const completedTraits = numberOfTraits.current - remainingTraits;
    const percentComplete = (completedTraits / numberOfTraits.current) * 100;
    setProgressState(percentComplete);
  }, [columnData, progressState, setProgressState, numberOfTraits]);

  useEffect(() => {
    // Store the current columnData in history when it changes
    if (!isUndoing.current) {
      setSelectionHistory((prevHistory) => [
        ...prevHistory,
        { ...columnData }, // Create a copy to avoid mutation
      ]);
    }
  }, [columnData]);

  // Persist progress whenever column data, selected traits, or the restart
  // context (color/flag) change.
  useEffect(() => {
    const updated = updateSelectionProgress(progressData, {
      column1: columnData.columns.column1.traitIds,
      column2: columnData.columns.column2.traitIds,
      column3: columnData.columns.column3.traitIds,
      selectedTraits: topTraits,
      hasRestarted,
      leftDroppableColor,
      rightDroppableColor,
    });
    setProgressData(updated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    columnData,
    topTraits,
    hasRestarted,
    leftDroppableColor,
    rightDroppableColor,
  ]);

  const undoLastSelection = useCallback(() => {
    setShouldSlideUp(true);
    isUndoing.current = true;
    setTimeout(() => {
      setShouldSlideUp(false);
      isUndoing.current = false;
    }, 600);
    setSelectionHistory((prevHistory) => {
      if (prevHistory.length <= 1) return prevHistory; // Prevent undo when no history exists

      // Create a new history array without the last entry
      const newHistory = prevHistory.slice(0, -1);

      // Restore the column data to the previous state (second to last entry)
      const lastSelection = newHistory[newHistory.length - 1];

      // Update the columnData to the previous state
      setColumnData(lastSelection);
      return newHistory; // Return updated history
    });
  }, [setColumnData]);

  // Set the undo function in the context whenever selection history changes
  useEffect(() => {
    undoFunction.current = undoLastSelection;
  }, [undoLastSelection, undoFunction]);

  function handleClearStack() {
    // Decide based on the LIKED pile (column1), which is what the thresholds
    // (`<7`, `>24`) actually mean. The original code branched on column3
    // (disliked), which only happened to work because the trait pool was
    // fixed-size and exclusive.
    const likedCount = columnData.columns.column1.traitIds.length;
    if (!hasRestarted) {
      if (likedCount < 7) {
        getMoreTraits();
      } else if (likedCount > 24) {
        getLessTraits();
      } else {
        endSelection(columnData.columns.column1.traitIds);
      }
    } else {
      endSelection(columnData.columns.column1.traitIds);
    }
  }
  function endSelection(currentTraits) {
    // Progress to ranking page
    setTopTraits(currentTraits);
    setActiveStepState(1);
    setProgressState(0);
    history.push("/Rank");
  }
  function getMoreTraits() {
    // Encourage user to add more traits
    const newColumnData = {
      ...columnData,
      columns: {
        ...columnData.columns,
        column2: {
          ...columnData.columns.column2,
          traitIds: [...columnData.columns.column1.traitIds],
        },
      },
    };

    setColumnData(newColumnData);
    setTutorialStringsState(["Let's try adding a few more traits."]);
  }
  function getLessTraits() {
    // Encourage user to remove traits
    const newColumnData = {
      ...columnData,
      columns: {
        ...columnData.columns,
        column2: {
          ...columnData.columns.column2,
          traitIds: [...columnData.columns.column3.traitIds],
        },
      },
    };
    setColumnData(newColumnData);
    setTutorialStringsState([
      "Let's try separating these into liked and loved traits",
    ]);
    setLeftDroppableColor("LightGreen");
    setRightDroppableColor("Gold");
    setHasRestarted(true);
  }
  return (
    <Box>
      <SkipSelectionButton
        setTopTraits={setTopTraits}
        history={history}
        setActiveStepState={setActiveStepState}
      />
      <FadeTextSeries stringArray={tutorialStringsState} />
      <div {...swipeHandlers}>
        <Grid container spacing={0} wrap="nowrap">
          <SelectionDroppable
            key={columnData.columns.column1.id}
            column={columnData.columns.column1}
            hoverColor={leftDroppableColor}
          />
          <SelectionDroppable
            key={columnData.columns.column2.id}
            column={columnData.columns.column2}
            isStarter={true}
            slideUp={shouldSlideUp}
            hoverColor={""}
          />
          <SelectionDroppable
            key={columnData.columns.column3.id}
            column={columnData.columns.column3}
            hoverColor={rightDroppableColor}
          />
        </Grid>
      </div>
    </Box>
  );
};
export default SelectionPage;
