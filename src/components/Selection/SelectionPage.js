// @flow
import React, { useEffect, useContext, useRef } from "react";
import SelectionDroppable from "./SelectionDroppable";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { ProgressContext } from "../App";
import FadeTextSeries from "../../utils/FadeTextSeries";
import { SkipSelectionButton } from "../../utils/devTools";
const SelectionPage = ({
  columnData,
  setTopTraits,
  history,
  swipeHandlers,
  topTraits,
}) => {
  const isMobile = useMediaQuery("(min-width:1024px");

  useEffect(() => {
    console.log("currentTraits: ", columnData.columns.column2.traitIds);
    console.log("top traits: ", columnData.columns.column3.traitIds);
    if (columnData.columns.column2.traitIds.length === 0) {
      console.log(columnData.columns.column3.traitIds);
      setTopTraits(columnData.columns.column3.traitIds);
      setActiveStepState(1);
      setProgressState(0);
      console.log("setting traits from selection");
      history.push("/Rank");
    }
  }, [columnData, history, setTopTraits, topTraits]);

  const { progress, activeStep } = useContext(ProgressContext);
  const [progressState, setProgressState] = progress;
  const [activeStepState, setActiveStepState] = activeStep;
  const numberOfTraits = useRef(columnData.columns.column2.traitIds.length);
  useEffect(() => {
    if (columnData.columns.column2.traitIds.length === 0) return;
    setProgressState(progressState + 100 / numberOfTraits.current);
  }, [columnData]);
  return (
    <Box>
      <SkipSelectionButton
        setTopTraits={setTopTraits}
        history={history}
        setActiveStepState={setActiveStepState}
      />
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
