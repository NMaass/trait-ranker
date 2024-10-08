import React, { useContext, useEffect, useMemo } from "react";
import RankingTrait from "./TraitCards/RankingTrait";
import { Grid, useMediaQuery, Button } from "@mui/material";
import { ProgressContext } from "./App";
import useMergeSort from "../utils/useMergeSort";

const RankingPage = ({ topTraits, history, finalList }) => {
  // Memoize topTraits to prevent unnecessary re-initialization
  const memoizedTopTraits = useMemo(() => topTraits.slice(), [topTraits]);
  useEffect(() => {
    console.log("Memoized topTraits:", memoizedTopTraits);
  }, [memoizedTopTraits]);

  const {
    progressPercent,
    currentStanding,
    currentMatch,
    matchWin,
    revertMatch,
    isComplete,
  } = useMergeSort(memoizedTopTraits);

  const isMobile = useMediaQuery("(min-width:1024px)");

  const { progress, activeStep } = useContext(ProgressContext);
  const [progressState, setProgressState] = progress;
  const [activeStepState, setActiveStepState] = activeStep;

  const handleRoundWin = (trait) => {
    matchWin(trait);
    setProgressState(progressPercent);
  };

  useEffect(() => {
    console.log("isComplete:", isComplete);
    if (isComplete) {
      setActiveStepState(3);
      history.push("/Results");
    }
  }, [isComplete]);

  const handleRevertMatch = () => {
    revertMatch();
    setProgressState(progressPercent);
  };

  // Ensure topTraits is populated before rendering
  if (!topTraits || topTraits.length === 0) {
    return <div>Loading traits...</div>;
  }

  return (
    <div>
      <Grid
        container
        spacing={isMobile ? 60 : 3}
        alignItems="center"
        justifyContent="center"
        direction={isMobile ? "row" : "column"}
      >
        {currentMatch && currentMatch.left && (
          <Grid item>
            <RankingTrait
              trait={currentMatch.left}
              onClick={() => handleRoundWin(currentMatch.left)}
            />
          </Grid>
        )}
        {currentMatch && currentMatch.right && (
          <Grid item>
            <RankingTrait
              trait={currentMatch.right}
              onClick={() => handleRoundWin(currentMatch.right)}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default RankingPage;
