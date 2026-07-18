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
import { coachingTextSx } from "../style/coachingText";

// The slide/fade animations run 600ms; the fallback waits comfortably longer
// so it only fires when a real `animationend` was missed, never mid-animation.
const ANIM_FALLBACK_MS = 950;

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
  // Safety net for the state machine above. animationend is the primary,
  // precise driver, but if it's ever missed — a tab hidden mid-animation
  // suspends animations, an interrupted animation may never emit the event —
  // the machine would deadlock and ranking would freeze with no recovery.
  // This timer force-advances after the animation *should* be done and is
  // cleared the instant animationend fires, so it only runs when the event was
  // actually lost — never cutting a real animation short.
  const fallbackRef = useRef(null);

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

  // out -> idle: slide-in finished; clear the transient classes so the cards
  // sit at rest (and the flip transition re-arms). Phase-guarded and idempotent
  // so animationend and the fallback timer can't double-run it.
  const finishSlideIn = useCallback(() => {
    if (animPhaseRef.current !== "in") return;
    clearFallback();
    animPhaseRef.current = "idle";
    setLeftCardClass("");
    setRightCardClass("");
  }, [clearFallback]);

  // out -> in: the winning card has slid away; apply the merge result and slide
  // the next match in. The fade-out end is intentionally not what gates this —
  // only the slide does, so the losing card always gets its full fade.
  const finishSlideOut = useCallback(() => {
    if (animPhaseRef.current !== "out") return;
    clearFallback();
    animPhaseRef.current = "in";
    matchWin(pendingWinnerRef.current);
    pendingWinnerRef.current = null;
    setLeftCardClass("slide-in");
    setRightCardClass("slide-in");
    fallbackRef.current = setTimeout(finishSlideIn, ANIM_FALLBACK_MS);
  }, [matchWin, clearFallback, finishSlideIn]);

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
      clearFallback();
      fallbackRef.current = setTimeout(finishSlideOut, ANIM_FALLBACK_MS);
    },
    [currentMatch, clearFallback, finishSlideOut]
  );

  const handleCardAnimationEnd = useCallback(
    (event) => {
      // finish* are phase-guarded no-ops for the wrong phase, so stray events
      // (like the loser's fade-out) are safely ignored.
      if (event.animationName === "slide-out") finishSlideOut();
      else if (event.animationName === "slide-in") finishSlideIn();
    },
    [finishSlideOut, finishSlideIn]
  );

  const handleRevertMatch = useCallback(() => {
    if (animPhaseRef.current !== "idle") return;
    animPhaseRef.current = "in";
    revertMatch();
    setLeftCardClass("slide-in");
    setRightCardClass("slide-in");
    clearFallback();
    fallbackRef.current = setTimeout(finishSlideIn, ANIM_FALLBACK_MS);
  }, [revertMatch, clearFallback, finishSlideIn]);

  useEffect(() => {
    undoFunction.current = handleRevertMatch;
  }, [handleRevertMatch, undoFunction]);

  // Never leave a timer running past unmount.
  useEffect(() => clearFallback, [clearFallback]);

  useEffect(() => {
    if (isComplete) {
      setTopTraits(currentStanding);
      setActiveStepState(3);
      // Functional updater so this can't clobber a concurrent progress write
      // with a stale `progressData` base (the persist effect above also writes).
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
    <>
      {/* Persistent prompt, sharing the Selection coaching line's style so
          guidance reads consistently across the app. */}
      <Typography
        variant={isDesktop ? "h5" : "subtitle1"}
        align="center"
        sx={coachingTextSx}
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
