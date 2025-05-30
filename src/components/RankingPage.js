import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import RankingTrait from "./TraitCards/RankingTrait";
import { Grid, useMediaQuery } from "@mui/material";
import { ProgressContext } from "./App";
import useMergeSort from "../utils/useMergeSort";
import { UndoContext } from "./App";
import "../style/CardStyle.scss";
import { updateRankingProgress } from "../utils/progressManagement";

const RankingPage = ({
  topTraits,
  setTopTraits,
  history,
  initalProgress,
  setProgressData,
  progressData,
}) => {
  // Memoize topTraits to prevent unnecessary re-initialization
  const memoizedTopTraits = useMemo(() => topTraits.slice(), [topTraits]);
  useEffect(() => {
    console.log("Memoized topTraits:", memoizedTopTraits);
  }, [memoizedTopTraits]);

  // Initialize traits from stored progress
  useEffect(() => {
    if (initalProgress?.data?.selection?.selectedTraits?.length) {
      setTopTraits(initalProgress.data.selection.selectedTraits);
    }
  }, []);

  const {
    progressPercent,
    currentMatch,
    currentStanding,
    matchWin,
    revertMatch,
    isComplete,
    rankingState,
  } = useMergeSort(memoizedTopTraits, initalProgress?.data?.ranking);

  const isMobile = useMediaQuery("(min-width:1024px)");

  const { progress, activeStep } = useContext(ProgressContext);
  const [progressState, setProgressState] = progress;
  const [activeStepState, setActiveStepState] = activeStep;
  const [leftCardClass, setLeftCardClass] = useState("");
  const [rightCardClass, setRightCardClass] = useState("");
  const { undoFunction } = useContext(UndoContext);

  useEffect(() => {
    if (progressPercent) {
      setProgressState(progressPercent);
    }
  }, [progressPercent, setProgressState]);

  // Persist ranking progress
  useEffect(() => {
    const updated = updateRankingProgress(progressData, rankingState);
    setProgressData(updated);
  }, [rankingState]);

  const handleRoundWin = useCallback(
    (trait) => {
      // Trigger slide-out animation
      if (trait === currentMatch.left) {
        setLeftCardClass("slide-out");
        setRightCardClass("fade-out");
      } else {
        setLeftCardClass("fade-out");
        setRightCardClass("slide-out");
      }

      // Set timeout to update the match and reset animations after slide-out is complete
      setTimeout(() => {
        matchWin(trait);
        setLeftCardClass("slide-in");
        setRightCardClass("slide-in");

        // Set another timeout to reset the classes after the slide-in animation
        setTimeout(() => {
          setLeftCardClass("");
          setRightCardClass("");
        }, 600);
      }, 600); // Timeout matches the slide-out animation duration
    },
    [currentMatch, matchWin]
  );

  const handleRevertMatch = useCallback(() => {
    revertMatch();
    setLeftCardClass("slide-in");
    setRightCardClass("slide-in");
    setTimeout(() => {
      setLeftCardClass("");
      setRightCardClass("");
    }, 600);
  }, [revertMatch]);

  useEffect(() => {
    undoFunction.current = handleRevertMatch;
  }, [handleRevertMatch, undoFunction]);

  useEffect(() => {
    console.log("isComplete:", isComplete);
    if (isComplete) {
      setTopTraits(currentStanding);
      setActiveStepState(3);
      setProgressData(updateRankingProgress(progressData, rankingState));
      history.push("/Results");
    }
  }, [isComplete]);

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
              className={leftCardClass}
              trait={currentMatch.left}
              onClick={() => handleRoundWin(currentMatch.left)}
              key={currentMatch.left}
            />
          </Grid>
        )}
        {currentMatch && currentMatch.right && (
          <Grid item>
            <RankingTrait
              className={rightCardClass}
              trait={currentMatch.right}
              onClick={() => handleRoundWin(currentMatch.right)}
              key={currentMatch.right}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default RankingPage;
