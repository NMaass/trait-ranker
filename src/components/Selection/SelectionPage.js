// @flow
import React, { useEffect, useContext, useRef, useState } from "react";
import SelectionDroppable from "./SelectionDroppable";
import { Box, Grid, useMediaQuery } from "@mui/material";
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
  const isMobile = useMediaQuery("(min-width:1024px");

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
  const { setUndoFunction } = useContext(UndoContext); // Use UndoContext

  const [selectionHistory, setSelectionHistory] = useState([]);

  useEffect(() => {
    if (columnData.columns.column2.traitIds.length === 0) return;
    setProgressState(progressState + 100 / numberOfTraits.current);
  }, [columnData]);

  useEffect(() => {
    setUndoFunction(() => undoLastSelection);
  }, []);
  useEffect(() => {
    // Store the current columnData in history when it changes
    setSelectionHistory((prevHistory) => [
      ...prevHistory,
      { ...columnData }, // Create a copy to avoid mutation
    ]);
  }, [columnData]);

  function undoLastSelection() {
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
  }

  console.log(selectionHistory);
  // Set the undo function in the context whenever selection history changes
  useEffect(() => {
    setUndoFunction(() => undoLastSelection);
  }, [selectionHistory, setUndoFunction]);

  function handleClearStack(topTraits) {
    if (topTraits.length < 7) {
      //encouge user to add more traits
      columnData.columns.column2.traitIds = columnData.columns.column1.traitIds;
      setTutorialStringsState("Let's try adding a few more traits.");
    } else if (topTraits.length > 24) {
      //encouge user to remove traits
      columnData.columns.column2.traitIds = columnData.columns.column3.traitIds;
      setTutorialStringsState(
        "Let's try removing a few traits to narrow it down."
      );
    } else {
      //progress to ranking page
      console.log(columnData.columns.column3.traitIds);
      setTopTraits(columnData.columns.column3.traitIds);
      setActiveStepState(1);
      setProgressState(0);
      history.push("/Rank");
    }
  }

  return (
    <Box>
      <SkipSelectionButton
        setTopTraits={setTopTraits}
        history={history}
        setActiveStepState={setActiveStepState}
      />
      <FadeTextSeries stringArray={tutorialStrings} />
      <div {...swipeHandlers}>
        <Grid container spacing={0} wrap="nowrap">
          <SelectionDroppable
            key={columnData.columns.column1.id}
            column={columnData.columns.column1}
            hoverColor={"LightPink"}
          />
          <SelectionDroppable
            key={columnData.columns.column2.id}
            column={columnData.columns.column2}
            isStarter={true}
            hoverColor={""}
          />
          <SelectionDroppable
            key={columnData.columns.column3.id}
            column={columnData.columns.column3}
            hoverColor={"LightGreen"}
          />
        </Grid>
      </div>
    </Box>
  );
};
export default SelectionPage;
