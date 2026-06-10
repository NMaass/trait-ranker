import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import RankingTrait from "./TraitCards/RankingTrait";
import { Box, Grid, Typography } from "@mui/material";
import { ProgressContext } from "./App";
import useMergeSort from "../utils/useMergeSort";
import useBreakpoint from "../utils/useBreakpoint";
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

  const { isDesktop } = useBreakpoint();

  const { progress, activeStep } = useContext(ProgressContext);
  const [progressState, setProgressState] = progress;
  const [activeStepState, setActiveStepState] = activeStep;
  const [leftCardClass, setLeftCardClass] = useState("");
  const [rightCardClass, setRightCardClass] = useState("");
  const { undoFunction } = useContext(UndoContext);
  const isAnimatingRef = useRef(false);

  // If a user lands on /Rank with no traits (deep link, post-clear), bounce
  // back to /Selection rather than showing an indefinite loading state.
  useEffect(() => {
    if (!topTraits || topTraits.length === 0) {
      history.replace("/Selection");
    }
  }, [topTraits, history]);

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
      // Drop rapid-fire clicks while a slide animation is in flight; otherwise
      // a second click reads the stale `currentMatch` and corrupts the merge.
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

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
          isAnimatingRef.current = false;
        }, 600);
      }, 600); // Timeout matches the slide-out animation duration
    },
    [currentMatch, matchWin]
  );

  const handleRevertMatch = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    revertMatch();
    setLeftCardClass("slide-in");
    setRightCardClass("slide-in");
    setTimeout(() => {
      setLeftCardClass("");
      setRightCardClass("");
      isAnimatingRef.current = false;
    }, 600);
  }, [revertMatch]);

  useEffect(() => {
    undoFunction.current = handleRevertMatch;
  }, [handleRevertMatch, undoFunction]);

  useEffect(() => {
    if (isComplete) {
      setTopTraits(currentStanding);
      setActiveStepState(3);
      setProgressData(updateRankingProgress(progressData, rankingState));
      history.push("/Results");
    }
  }, [isComplete]);

  // Ensure topTraits is populated before rendering. The redirect-to-/Selection
  // effect above handles the deep-link case; this is just a one-frame loader.
  if (!topTraits || topTraits.length === 0) {
    return (
      <Typography align="center" sx={{ color: "text.secondary" }}>
        One moment…
      </Typography>
    );
  }

  const hasMatch = currentMatch && currentMatch.left && currentMatch.right;

  return (
    <div>
      <Typography
        variant={isDesktop ? "h5" : "subtitle1"}
        align="center"
        sx={{
          position: "absolute",
          top: "calc(64px + 1.5rem)",
          left: 0,
          width: "100%",
          color: "text.secondary",
          fontWeight: 500,
        }}
      >
        Which matters more to you?
      </Typography>
      <Grid
        container
        spacing={isDesktop ? 6 : 2}
        alignItems="center"
        justifyContent="center"
        direction={isDesktop ? "row" : "column"}
        wrap="nowrap"
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
        {hasMatch && (
          <Grid item>
            <Box
              aria-hidden
              sx={{
                width: { xs: 36, md: 48 },
                height: { xs: 36, md: 48 },
                borderRadius: "50%",
                bgcolor: "background.paper",
                boxShadow:
                  "0 1px 2px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "text.secondary",
                fontWeight: 700,
                fontSize: { xs: "0.75rem", md: "0.9rem" },
                textTransform: "uppercase",
              }}
            >
              vs
            </Box>
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
