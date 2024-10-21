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

const RankingPage = ({ topTraits, setTopTraits, history, initalProgress }) => {
  // Memoize topTraits to prevent unnecessary re-initialization
  const memoizedTopTraits = useMemo(() => topTraits.slice(), [topTraits]);
  useEffect(() => {
    console.log("Memoized topTraits:", memoizedTopTraits);
  }, [memoizedTopTraits]);

  const {
    progressPercent,
    currentMatch,
    currentStanding,
    matchWin,
    revertMatch,
    isComplete,
  } = useMergeSort(memoizedTopTraits, initalProgress?.data?.ranking);

  const isMobile = useMediaQuery("(min-width:1024px)");

  const { progress, activeStep } = useContext(ProgressContext);
  const [progressState, setProgressState] = progress;
  const [activeStepState, setActiveStepState] = activeStep;
  const [leftCardClass, setLeftCardClass] = useState("");
  const [rightCardClass, setRightCardClass] = useState("");
  const { undoFunction } = useContext(UndoContext);

  useEffect(() => {
    undoFunction.current = revertMatch;
  }, [revertMatch, undoFunction]);

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
        setProgressState(progressPercent);
        setLeftCardClass("slide-in");
        setRightCardClass("slide-in");

        // Set another timeout to reset the classes after the slide-in animation
        setTimeout(() => {
          setLeftCardClass("");
          setRightCardClass("");
        }, 600);
      }, 600); // Timeout matches the slide-out animation duration
    },
    [currentMatch, matchWin, progressPercent, setProgressState]
  );

  useEffect(() => {
    console.log("isComplete:", isComplete);
    if (isComplete) {
      setTopTraits(currentStanding);
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
