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
const SelectionPage = ({
  columnData,
  setColumnData,
  setTopTraits,
  history,
  swipeHandlers,
  topTraits,
}) => {
  useEffect(() => {
    if (columnData.columns.column2.traitIds.length === 0) {
      handleClearStack(columnData.columns.column3.traitIds);
    }
  }, [columnData, history, setTopTraits, topTraits]);

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

  const [leftDroppableColor, setLeftDroppableColor] = useState("LightPink");
  const [rightDroppableColor, setRightDroppableColor] = useState("LightGreen");

  const [hasRestarted, setHasRestarted] = useState(false);

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

  function handleClearStack(topTraits) {
    if (!hasRestarted) {
      if (topTraits.length < 7) {
        getMoreTraits();
      } else if (topTraits.length > 24) {
        getLessTraits();
      } else {
        endSelection();
      }
    } else {
      endSelection();
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
