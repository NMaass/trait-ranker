import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import RankingTrait from "./TraitCards/RankingTrait";
import { Grid, Typography } from "@mui/material";
import { ProgressContext } from "./App";
import useMergeSort from "../utils/useMergeSort";
import useBreakpoint from "../utils/useBreakpoint";
import { UndoContext } from "./App";
import "../style/CardStyle.scss";
import { updateRankingProgress } from "../utils/progressManagement";

// The slide/fade animations run 600ms; the fallback waits comfortably longer
// so it only fires when a real `animationend` was missed, never mid-animation.
const ANIM_FALLBACK_MS = 950;
// requestAnimationFrame can be suspended in a background tab. This fallback
// advances the short reset phase without waiting for the tab to become visible.
const RESET_FALLBACK_MS = 100;

const RankingPage = ({
  topTraits,
  setTopTraits,
  history,
  initalProgress,
  setProgressData,
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
  const [, setProgressState] = progress;
  const [, setActiveStepState] = activeStep;
  const [leftCardClass, setLeftCardClass] = useState("");
  const [rightCardClass, setRightCardClass] = useState("");
  const { undoFunction } = useContext(UndoContext);
  // Animation state machine: "idle" | "out" | "reset" | "in". The reset
  // frame explicitly removes the outgoing classes before the next pair enters,
  // so `fade-out` cannot leave its forwards-filled opacity on reused card DOM.
  const animPhaseRef = useRef("idle");
  const pendingWinnerRef = useRef(null);
  const fallbackRef = useRef(null);
  const resetFrameRef = useRef(null);

  // If a user lands on /Rank with no traits (deep link, post-clear), bounce
  // back to /Selection rather than showing an indefinite loading state.
  useEffect(() => {
    if (!topTraits || topTraits.length === 0) {
      history.replace("/Selection");
    }
  }, [topTraits, history]);

  useEffect(() => {
    // `!= null` (not truthiness) so 0% is applied too — otherwise the bar
    // kept showing a previous run's 100% until the first pick of a new run.
    if (progressPercent != null) {
      setProgressState(progressPercent);
    }
  }, [progressPercent, setProgressState]);

  // Persist ranking progress. rankingState is memoized inside useMergeSort,
  // so this only fires when the sort actually advances (not every render).
  useEffect(() => {
    setProgressData((prev) => updateRankingProgress(prev, rankingState));
  }, [rankingState, setProgressData]);

  const clearFallback = useCallback(() => {
    if (fallbackRef.current) {
      clearTimeout(fallbackRef.current);
      fallbackRef.current = null;
    }
  }, []);

  const clearResetFrame = useCallback(() => {
    if (resetFrameRef.current) {
      cancelAnimationFrame(resetFrameRef.current);
      resetFrameRef.current = null;
    }
  }, []);

  // in -> idle: slide-in finished; clear transient classes so the cards sit at
  // rest and the same DOM nodes are ready for another comparison.
  const finishSlideIn = useCallback(() => {
    if (animPhaseRef.current !== "in") return;
    clearFallback();
    animPhaseRef.current = "idle";
    setLeftCardClass("");
    setRightCardClass("");
  }, [clearFallback]);

  const startSlideIn = useCallback(() => {
    if (animPhaseRef.current !== "reset") return;
    clearResetFrame();
    clearFallback();
    animPhaseRef.current = "in";
    setLeftCardClass("slide-in");
    setRightCardClass("slide-in");
    fallbackRef.current = setTimeout(finishSlideIn, ANIM_FALLBACK_MS);
  }, [clearResetFrame, clearFallback, finishSlideIn]);

  // out -> reset -> in: first clear both outgoing classes and commit the next
  // pair. Add slide-in on the following frame, after the browser has painted
  // the reset state. This is the important separation that prevents a losing
  // card's `fade-out` opacity from leaking into its next trait.
  const finishSlideOut = useCallback(() => {
    if (animPhaseRef.current !== "out") return;
    clearFallback();
    clearResetFrame();
    animPhaseRef.current = "reset";

    const winner = pendingWinnerRef.current;
    pendingWinnerRef.current = null;
    setLeftCardClass("");
    setRightCardClass("");
    matchWin(winner);

    resetFrameRef.current = requestAnimationFrame(startSlideIn);
    fallbackRef.current = setTimeout(startSlideIn, RESET_FALLBACK_MS);
  }, [matchWin, clearFallback, clearResetFrame, startSlideIn]);

  const handleRoundWin = useCallback(
    (trait) => {
      // Drop rapid-fire clicks while an animation is in flight; otherwise a
      // second click reads the stale `currentMatch` and corrupts the merge.
      if (animPhaseRef.current !== "idle" || !currentMatch) return;
      animPhaseRef.current = "out";
      pendingWinnerRef.current = trait;

      if (trait === currentMatch.left) {
        setLeftCardClass("slide-out");
        setRightCardClass("fade-out");
      } else {
        setLeftCardClass("fade-out");
        setRightCardClass("slide-out");
      }
      clearFallback();
      fallbackRef.current = setTimeout(finishSlideOut, ANIM_FALLBACK_MS);
    },
    [currentMatch, clearFallback, finishSlideOut]
  );

  const handleCardAnimationEnd = useCallback(
    (event) => {
      if (event.animationName === "slide-out") finishSlideOut();
      else if (event.animationName === "slide-in") finishSlideIn();
    },
    [finishSlideOut, finishSlideIn]
  );

  const handleRevertMatch = useCallback(() => {
    if (animPhaseRef.current !== "idle") return;
    clearFallback();
    clearResetFrame();
    animPhaseRef.current = "in";
    revertMatch();
    setLeftCardClass("slide-in");
    setRightCardClass("slide-in");
    fallbackRef.current = setTimeout(finishSlideIn, ANIM_FALLBACK_MS);
  }, [revertMatch, clearFallback, clearResetFrame, finishSlideIn]);

  useEffect(() => {
    undoFunction.current = handleRevertMatch;
  }, [handleRevertMatch, undoFunction]);

  useEffect(
    () => () => {
      clearFallback();
      clearResetFrame();
    },
    [clearFallback, clearResetFrame]
  );

  useEffect(() => {
    if (isComplete) {
      setTopTraits(currentStanding);
      setActiveStepState(3);
      setProgressData((prev) => updateRankingProgress(prev, rankingState));
      history.push("/Results");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <Grid
      container
      spacing={isDesktop ? 6 : 2}
      alignItems="center"
      justifyContent="center"
      direction={isDesktop ? "row" : "column"}
      wrap="nowrap"
    >
      {currentMatch && currentMatch.left && (
        <Grid item sx={{ display: "flex" }}>
          <RankingTrait
            className={leftCardClass}
            trait={currentMatch.left}
            onClick={() => handleRoundWin(currentMatch.left)}
            onAnimationEnd={handleCardAnimationEnd}
            disabled={animPhaseRef.current !== "idle"}
          />
        </Grid>
      )}
      {currentMatch && currentMatch.right && (
        <Grid item sx={{ display: "flex" }}>
          <RankingTrait
            className={rightCardClass}
            trait={currentMatch.right}
            onClick={() => handleRoundWin(currentMatch.right)}
            onAnimationEnd={handleCardAnimationEnd}
            disabled={animPhaseRef.current !== "idle"}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default RankingPage;
