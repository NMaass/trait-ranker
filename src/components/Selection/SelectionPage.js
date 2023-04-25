// @flow
import React, { useEffect, useRef, useState } from "react";
import SelectionDroppable from "./SelectionDroppable";
import { Box, Grid, useMediaQuery } from "@mui/material";
import FadeTextSeries from "../../utils/FadeTextSeries";

const SelectionPage = ({
  columnData,
  setTopTraits,
  history,
  swipeHandlers,
}) => {
  const isMobile = useMediaQuery("(min-width:1024px");

  useEffect(() => {
    console.log("currentTraits: ", columnData.columns.column2.traitIds);
    console.log("top traits: ", columnData.columns.column3.traitIds);
    if (columnData.columns.column2.traitIds.length === 0) {
      console.log(columnData.columns.column3.traitIds);
      setTopTraits(columnData.columns.column3.traitIds);
      console.log("setting traits from selection");
      history.push("/Rank");
    }
  }, [columnData, history, setTopTraits]);

  const selectionIntro = [
    `${isMobile ? "Drag" : "Swipe "} right to like, left to pass.`,
    "Press the ? button at any time to see an example.",
  ];

  return (
    <Box>
      <FadeTextSeries stringArray={selectionIntro} />
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
