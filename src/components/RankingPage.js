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
  // Animation state machine: "idle" | "out" | "in". Transitions are driven by
  // animationend events (see handleCardAnimationEnd), NOT parallel timeouts —
  // a setTimeout can fire before the animation's final frame paints (common
  // under load on phones), which used to cut the fade-out short, pop cards
  // back in at the end of the slide, and shift cards mid-slide-in.
  const animPhaseRef = useRef("idle");
  const pendingWinnerRef = useRef(null);

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

  const handleRoundWin = useCallback(
    (trait) => {
      // Drop rapid-fire clicks while a slide animation is in flight; otherwise
      // a second click reads the stale `currentMatch` and corrupts the merge.
      if (animPhaseRef.current !== "idle") return;
      animPhaseRef.current = "out";
      pendingWinnerRef.current = trait;

      // Trigger slide-out animation
      if (trait === currentMatch.left) {
        setLeftCardClass("slide-out");
        setRightCardClass("fade-out");
      } else {
        setLeftCardClass("fade-out");
        setRightCardClass("slide-out");
      }
    },
    [currentMatch]
  );

  // Pivot the state machine off the real animation lifecycle. The fade-out
  // end is ignored on purpose — only the slide gates the merge update, so the
  // losing card always gets its full fade before anything unmounts.
  const handleCardAnimationEnd = useCallback(
    (event) => {
      if (
        event.animationName === "slide-out" &&
        animPhaseRef.current === "out"
      ) {
        animPhaseRef.current = "in";
        matchWin(pendingWinnerRef.current);
        pendingWinnerRef.current = null;
        setLeftCardClass("slide-in");
        setRightCardClass("slide-in");
      } else if (
        event.animationName === "slide-in" &&
        animPhaseRef.current === "in"
      ) {
        // slide-in has no fill (it ends exactly at the natural position), so
        // clearing the class after completion causes no visual change — it
        // just re-arms the animation and the flip transition for next round.
        animPhaseRef.current = "idle";
        setLeftCardClass("");
        setRightCardClass("");
      }
    },
    [matchWin]
  );

  const handleRevertMatch = useCallback(() => {
    if (animPhaseRef.current !== "idle") return;
    animPhaseRef.current = "in";
    revertMatch();
    setLeftCardClass("slide-in");
    setRightCardClass("slide-in");
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

  return (
    <>
      {/* Persistent prompt, in the same "home" (position + style) as the
          Selection coaching line so guidance reads consistently across the
          app. z-index keeps it above the cards (.card is z-index:1). */}
      <Typography
        variant={isDesktop ? "h5" : "subtitle1"}
        align="center"
        sx={{
          minHeight: "1.9rem",
          position: "absolute",
          top: "calc(64px + 1.5rem)",
          left: 0,
          width: "100%",
          zIndex: 3,
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
          <Grid item sx={{ display: "flex" }}>
            <RankingTrait
              className={leftCardClass}
              trait={currentMatch.left}
              onClick={() => handleRoundWin(currentMatch.left)}
              onAnimationEnd={handleCardAnimationEnd}
              key={currentMatch.left}
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
              key={currentMatch.right}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default RankingPage;
