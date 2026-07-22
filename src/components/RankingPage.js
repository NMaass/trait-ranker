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
import UndoButton from "./UndoButton";

// The slide/fade animations run 600ms; the fallback waits comfortably longer
// so it only fires when a real `animationend` was missed, never mid-animation.
const ANIM_FALLBACK_MS = 950;

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
  const [roundKey, setRoundKey] = useState(0);
  const { undoFunction } = useContext(UndoContext);
  // Animation state machine: "idle" | "out" | "in". The next comparison is
  // shown by REMOUNTING both cards (roundKey bump) rather than reusing the
  // same DOM node — so the losing card's `fade-out` (animation-fill-mode:
  // forwards) can never leak its zero opacity into the trait that replaces it.
  // The outgoing pair simply leaves the screen; a fresh pair slides in.
  const animPhaseRef = useRef("idle");
  const pendingWinnerRef = useRef(null);
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

  // in -> idle: slide-in finished; clear transient classes so the cards sit at
  // rest and are ready for the next pick.
  const finishSlideIn = useCallback(() => {
    if (animPhaseRef.current !== "in") return;
    clearFallback();
    animPhaseRef.current = "idle";
    setLeftCardClass("");
    setRightCardClass("");
  }, [clearFallback]);

  // out -> in: the winning card has slid away. Commit the merge result,
  // then REMOUNT the card pair (roundKey++) so a brand-new DOM node slides in
  // — no chance for the previous loser's fade-out fill to cling on.
  const finishSlideOut = useCallback(() => {
    if (animPhaseRef.current !== "out") return;
    clearFallback();
    animPhaseRef.current = "in";

    const winner = pendingWinnerRef.current;
    pendingWinnerRef.current = null;
    matchWin(winner);
    setRoundKey((k) => k + 1);
    setLeftCardClass("slide-in");
    setRightCardClass("slide-in");
    fallbackRef.current = setTimeout(finishSlideIn, ANIM_FALLBACK_MS);
  }, [matchWin, clearFallback, finishSlideIn]);

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
    animPhaseRef.current = "in";
    revertMatch();
    // Undo also shows a fresh pair: remount so the restored trait enters clean.
    setRoundKey((k) => k + 1);
    setLeftCardClass("slide-in");
    setRightCardClass("slide-in");
    fallbackRef.current = setTimeout(finishSlideIn, ANIM_FALLBACK_MS);
  }, [revertMatch, clearFallback, finishSlideIn]);

  useEffect(() => {
    undoFunction.current = handleRevertMatch;
  }, [handleRevertMatch, undoFunction]);

  // Don't leave a stale handler behind for other pages to call after unmount.
  useEffect(() => () => { undoFunction.current = null; }, [undoFunction]);

  useEffect(() => () => clearFallback(), [clearFallback]);

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
    <>
      {/* Reserve real layout space for the app bar (top) and the undo bar
          (bottom) instead of letting body-centering place the cards under
          them — this is what keeps the top card from being clipped on short
          phone viewports. The --card-w formula in CardStyle.scss reserves
          the same heights, so the cards always fit the box they center in. */}
      <Box
        sx={{
          // 100dvh tracks the visible area as mobile chrome shows/hides; the
          // body's own 100vh rule is the pre-dvh fallback.
          height: "100dvh",
          boxSizing: "border-box",
          pt: { xs: "56px", sm: "64px" },
          pb: "calc(env(safe-area-inset-bottom, 0px) + 84px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
                key={`L-${roundKey}`}
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
                key={`R-${roundKey}`}
                className={rightCardClass}
                trait={currentMatch.right}
                onClick={() => handleRoundWin(currentMatch.right)}
                onAnimationEnd={handleCardAnimationEnd}
                disabled={animPhaseRef.current !== "idle"}
              />
            </Grid>
          )}
        </Grid>
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: "calc(env(safe-area-inset-bottom, 0px) + max(2.5vh, 1rem))",
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <UndoButton label="Undo last pick" />
      </Box>
    </>
  );
};

export default RankingPage;
