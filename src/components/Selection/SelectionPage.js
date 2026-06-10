// @flow
import React, {
  useEffect,
  useContext,
  useRef,
  useState,
  useCallback,
} from "react";
import SelectionDroppable from "./SelectionDroppable";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseRounded from "@mui/icons-material/CloseRounded";
import CheckRounded from "@mui/icons-material/CheckRounded";
import ThumbUpAltRounded from "@mui/icons-material/ThumbUpAltRounded";
import FavoriteRounded from "@mui/icons-material/FavoriteRounded";
import { ProgressContext } from "../App";
import { TutorialContext } from "../App";
import { SkipSelectionButton } from "../../utils/devTools";
import { UndoContext } from "../App";
import FadeTextSeries from "../../utils/FadeTextSeries";
import { updateSelectionProgress } from "../../utils/progressManagement";
const SelectionPage = ({
  columnData,
  setColumnData,
  setTopTraits,
  history,
  swipeHandlers,
  onSwipe,
  topTraits,
  progressData,
  setProgressData,
}) => {
  useEffect(() => {
    if (columnData.columns.column2.traitIds.length === 0) {
      handleClearStack();
    }
    // We only react to columnData here; the inner handler reads the latest
    // column1 length itself, so other deps would just over-fire.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnData]);

  const { progress, activeStep } = useContext(ProgressContext);
  const [progressState, setProgressState] = progress;
  const [activeStepState, setActiveStepState] = activeStep;
  const { tutorialStrings } = useContext(TutorialContext);
  const [tutorialStringsState, setTutorialStringsState] = tutorialStrings;
  const numberOfTraits = useRef(columnData.columns.column2.traitIds.length);
  const { undoFunction } = useContext(UndoContext);
  const isUndoing = useRef(false);
  const [shouldSlideUp, setShouldSlideUp] = useState(false);

  const [selectionHistory, setSelectionHistory] = useState([]);

  const theme = useTheme();
  // Pull droppable hover colors from theme. Default phase: rose (reject) on
  // the left, mint (accept) on the right. Restart phase shifts the bar:
  // mint moves left ("liked"), cream moves right ("loved").
  const [leftDroppableColor, setLeftDroppableColor] = useState(
    progressData?.data?.selection?.leftDroppableColor ||
      theme.palette.custom.dropReject
  );
  const [rightDroppableColor, setRightDroppableColor] = useState(
    progressData?.data?.selection?.rightDroppableColor ||
      theme.palette.custom.dropAccept
  );

  const [hasRestarted, setHasRestarted] = useState(
    !!progressData?.data?.selection?.hasRestarted
  );

  // First-visit guidance: one plain sentence that names the gesture for this
  // device, then fades away. Skipped if another message is already queued
  // (e.g. the "add a few more" coaching after a restart). matchMedia is read
  // directly because the hook-based breakpoint hasn't resolved on first mount.
  useEffect(() => {
    if (tutorialStringsState.length === 0) {
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      setTutorialStringsState([
        `${desktop ? "Drag" : "Swipe"} right to keep a trait, left to pass`,
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load saved selection progress on mount — but only when the saved blob
  // actually has content. createProgress() seeds empty arrays for column1/2/3,
  // and unconditionally hydrating from that wipes the freshly shuffled starter
  // pile, leaving the front of the card blank.
  useEffect(() => {
    const sel = progressData?.data?.selection;
    if (!sel) return;
    const hasContent =
      (sel.column1?.length || 0) > 0 ||
      (sel.column2?.length || 0) > 0 ||
      (sel.column3?.length || 0) > 0;
    if (!hasContent) return;

    setColumnData((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        column1: {
          ...prev.columns.column1,
          traitIds: sel.column1 || [],
        },
        column2: {
          ...prev.columns.column2,
          traitIds: sel.column2 || [],
        },
        column3: {
          ...prev.columns.column3,
          traitIds: sel.column3 || [],
        },
      },
    }));
    if (sel.selectedTraits?.length) {
      setTopTraits(sel.selectedTraits);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (columnData.columns.column2.traitIds.length === 0) return;
    const remainingTraits = columnData.columns.column2.traitIds.length;
    const completedTraits = numberOfTraits.current - remainingTraits;
    const percentComplete = (completedTraits / numberOfTraits.current) * 100;
    setProgressState(percentComplete);
  }, [columnData, progressState, setProgressState, numberOfTraits]);

  useEffect(() => {
    // Store the current columnData in history when it changes
    if (!isUndoing.current) {
      setSelectionHistory((prevHistory) => [
        ...prevHistory,
        { ...columnData }, // Create a copy to avoid mutation
      ]);
    }
  }, [columnData]);

  // Persist progress whenever column data, selected traits, or the restart
  // context (color/flag) change.
  useEffect(() => {
    const updated = updateSelectionProgress(progressData, {
      column1: columnData.columns.column1.traitIds,
      column2: columnData.columns.column2.traitIds,
      column3: columnData.columns.column3.traitIds,
      selectedTraits: topTraits,
      hasRestarted,
      leftDroppableColor,
      rightDroppableColor,
    });
    setProgressData(updated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    columnData,
    topTraits,
    hasRestarted,
    leftDroppableColor,
    rightDroppableColor,
  ]);

  const undoLastSelection = useCallback(() => {
    setShouldSlideUp(true);
    isUndoing.current = true;
    setTimeout(() => {
      setShouldSlideUp(false);
      isUndoing.current = false;
    }, 600);
    setSelectionHistory((prevHistory) => {
      if (prevHistory.length <= 1) return prevHistory; // Prevent undo when no history exists

      // Create a new history array without the last entry
      const newHistory = prevHistory.slice(0, -1);

      // Restore the column data to the previous state (second to last entry)
      const lastSelection = newHistory[newHistory.length - 1];

      // Update the columnData to the previous state
      setColumnData(lastSelection);
      return newHistory; // Return updated history
    });
  }, [setColumnData]);

  // Set the undo function in the context whenever selection history changes
  useEffect(() => {
    undoFunction.current = undoLastSelection;
  }, [undoLastSelection, undoFunction]);

  function handleClearStack() {
    // column3 ("Valued") is the LIKED pile; column1 ("Not Valued") is disliked.
    // Thresholds gate based on how many traits the user *kept*, and we hand
    // the kept pile off to the ranking phase.
    const likedCount = columnData.columns.column3.traitIds.length;
    if (!hasRestarted) {
      if (likedCount < 7) {
        getMoreTraits();
      } else if (likedCount > 24) {
        getLessTraits();
      } else {
        endSelection(columnData.columns.column3.traitIds);
      }
    } else {
      endSelection(columnData.columns.column3.traitIds);
    }
  }
  function endSelection(currentTraits) {
    // Progress to ranking page
    setTopTraits(currentTraits);
    setActiveStepState(1);
    setProgressState(0);
    history.push("/Rank");
  }
  function getMoreTraits() {
    // Encourage user to add more traits
    const newColumnData = {
      ...columnData,
      columns: {
        ...columnData.columns,
        column2: {
          ...columnData.columns.column2,
          traitIds: [...columnData.columns.column1.traitIds],
        },
      },
    };

    setColumnData(newColumnData);
    setTutorialStringsState([
      "Let's take another look",
      "Keep any trait that might matter to you",
    ]);
  }
  function getLessTraits() {
    // Encourage user to remove traits
    const newColumnData = {
      ...columnData,
      columns: {
        ...columnData.columns,
        column2: {
          ...columnData.columns.column2,
          traitIds: [...columnData.columns.column3.traitIds],
        },
      },
    };
    setColumnData(newColumnData);
    setTutorialStringsState([
      "You kept quite a few!",
      "Which do you like — and which do you love?",
    ]);
    // Restart phase: the bar got higher. Liked moves to mint (was the accept
    // tier), loved is the new top tier (cream).
    setLeftDroppableColor(theme.palette.custom.dropAccept);
    setRightDroppableColor(theme.palette.custom.dropLove);
    setHasRestarted(true);
  }
  // Tap targets that mirror the swipe gesture — same semantics, same colors
  // as the drop zones, so clicking and dragging always agree.
  const remaining = columnData.columns.column2.traitIds.length;
  const inkFor = {
    [theme.palette.custom.dropReject]: theme.palette.custom.inkReject,
    [theme.palette.custom.dropAccept]: theme.palette.custom.inkAccept,
    [theme.palette.custom.dropLove]: theme.palette.custom.inkLove,
  };
  const actions = [
    {
      label: hasRestarted ? "Like" : "Pass",
      Icon: hasRestarted ? ThumbUpAltRounded : CloseRounded,
      color: leftDroppableColor,
      direction: "left",
    },
    {
      label: hasRestarted ? "Love" : "Keep",
      Icon: hasRestarted ? FavoriteRounded : CheckRounded,
      color: rightDroppableColor,
      direction: "right",
    },
  ];

  return (
    <Box>
      <SkipSelectionButton
        setTopTraits={setTopTraits}
        history={history}
        setActiveStepState={setActiveStepState}
      />
      <FadeTextSeries stringArray={tutorialStringsState} />
      <div {...swipeHandlers}>
        <Grid container spacing={0} wrap="nowrap">
          <SelectionDroppable
            key={columnData.columns.column1.id}
            column={columnData.columns.column1}
            hoverColor={leftDroppableColor}
          />
          <SelectionDroppable
            key={columnData.columns.column2.id}
            column={columnData.columns.column2}
            isStarter={true}
            slideUp={shouldSlideUp}
            hoverColor={""}
          />
          <SelectionDroppable
            key={columnData.columns.column3.id}
            column={columnData.columns.column3}
            hoverColor={rightDroppableColor}
          />
        </Grid>
      </div>
      {remaining > 0 && (
        <Box
          sx={{
            position: "fixed",
            bottom: "max(4vh, 1.5rem)",
            left: 0,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            zIndex: 10,
            // Let drags pass through the bar itself; only the buttons catch
            // the pointer.
            pointerEvents: "none",
          }}
        >
          {actions.map(({ label, Icon, color, direction }, i) => (
            <React.Fragment key={direction}>
              {i === 1 && (
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", minWidth: "3rem" }}
                  align="center"
                >
                  {remaining} left
                </Typography>
              )}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <IconButton
                  onClick={() => onSwipe && onSwipe(direction)}
                  aria-label={label}
                  sx={{
                    pointerEvents: "auto",
                    width: 60,
                    height: 60,
                    bgcolor: color,
                    color: inkFor[color] || "text.primary",
                    boxShadow:
                      "0 1px 2px rgba(0,0,0,0.05), 0 6px 16px rgba(0,0,0,0.1)",
                    "&:hover": { bgcolor: color },
                  }}
                >
                  <Icon fontSize="medium" />
                </IconButton>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", lineHeight: 1 }}
                >
                  {label}
                </Typography>
              </Box>
            </React.Fragment>
          ))}
        </Box>
      )}
    </Box>
  );
};
export default SelectionPage;
