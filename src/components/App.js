// @flow
import React, { useEffect, useRef, useState, createContext } from "react";
import initialTraits from "./Selection/initialTraits";
import ResultsPage from "./ResultsPage";
import RankingPage from "./RankingPage";
import NavBar from "./NavBar/NavBar";
import { HashRouter, Route, useHistory, Redirect } from "react-router-dom";
import SelectionPage from "./Selection/SelectionPage";
import ReactGA from "react-ga";
import SharedPage from "./Share/SharedPage";
import { DragDropContext } from "react-beautiful-dnd";
import type { SensorAPI } from "react-beautiful-dnd/src/types";
import { useSwipeable } from "react-swipeable";
import tweenFunctions from "tween-functions";
import { makeAndTrackId } from "../utils/mixpanel";
import appTheme from "../style/appTheme";
import { ThemeProvider } from "@mui/material/styles";
import {
  loadProgress,
  createProgress,
  saveProgress,
  clearProgress,
  hasResumableProgress,
} from "../utils/progressManagement";
import ResumePrompt from "./ResumePrompt";

export const ProgressContext = createContext();
export const TutorialContext = createContext();
export const UndoContext = createContext();
// Exposed by App so any descendant ("Home", "Start Over") can fully reset
// in-memory state in addition to wiping localStorage.
export const ResetContext = createContext(() => {});

const TRACKING_ID = "G-4RLGL8ENZC";

const buildInitialColumnData = () => initialTraits;
const buildInitialTopTraits = () =>
  initialTraits.columns.column2.traitIds.slice(0, 18);

const App = () => {
  const history = useHistory();
  const [columnData, setColumnData] = useState(buildInitialColumnData);
  const [topTraits, setTopTraits] = useState(buildInitialTopTraits);
  const [userId, setUserId] = useState(makeAndTrackId(6));
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  // Always start from a fresh blob so the first paint shows the initial
  // shuffled traits. If there's something resumable in storage, the mount
  // effect below opens the prompt and `applyStoredProgress` swaps state in
  // only after the user picks "Resume".
  const [progressData, setProgressData] = useState(createProgress);
  const [tutorialStrings, setTutorialStrings] = useState([]);
  const [resumePromptOpen, setResumePromptOpen] = useState(false);
  const [resumeStage, setResumeStage] = useState("selection");
  const undoFunction = useRef(null);
  const sensorAPIRef = useRef<?SensorAPI>(null);

  // Initialize analytics once on mount, not on every render.
  useEffect(() => {
    try {
      ReactGA.initialize(TRACKING_ID);
    } catch (e) {
      // Analytics failure shouldn't break the app.
      console.warn("ReactGA failed to initialize", e);
    }
  }, []);

  // Decide on mount whether to ask the user about resuming a saved session.
  // We do NOT auto-route into Rank/Results anymore; the user opts in.
  useEffect(() => {
    const stored = loadProgress();
    if (!stored) return;
    if (hasResumableProgress(stored)) {
      setResumeStage(stored.stage || "selection");
      setResumePromptOpen(true);
    } else {
      // Nothing meaningful to resume — wipe to keep storage tidy.
      clearProgress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyStoredProgress = (stored) => {
    setProgressData(stored);
    setProgress(stored.data?.ranking?.progressPercent || 0);
    const stepMap = { selection: 0, ranking: 1, results: 3 };
    setActiveStep(stepMap[stored.stage] || 0);

    if (stored.data?.selection) {
      setColumnData((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          column1: {
            ...prev.columns.column1,
            traitIds: stored.data.selection.column1 || [],
          },
          column2: {
            ...prev.columns.column2,
            traitIds: stored.data.selection.column2 || [],
          },
          column3: {
            ...prev.columns.column3,
            traitIds: stored.data.selection.column3 || [],
          },
        },
      }));
      if (stored.data.selection.selectedTraits?.length) {
        setTopTraits(stored.data.selection.selectedTraits);
      }
    }

    if (stored.stage === "ranking") {
      history.push("/Rank");
    } else if (stored.stage === "results") {
      history.push("/Results");
    }
  };

  const handleResume = () => {
    setResumePromptOpen(false);
    const stored = loadProgress();
    if (stored) applyStoredProgress(stored);
  };

  const reset = () => {
    clearProgress();
    setColumnData(buildInitialColumnData());
    setTopTraits(buildInitialTopTraits());
    setActiveStep(0);
    setProgress(0);
    setProgressData(createProgress());
    setTutorialStrings([]);
    setResumePromptOpen(false);
  };

  const handleStartOver = () => {
    reset();
  };

  const onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) {
      return;
    }
    //make sure the draggable moved
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const start = columnData.columns[source.droppableId];
    const finish = columnData.columns[destination.droppableId];

    //if moving within the same column
    if (start === finish) {
      const newTraitIds = Array.from(start.traitIds);
      newTraitIds.splice(source.index, 1);
      newTraitIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        traitIds: newTraitIds,
      };

      //override existing column
      const newData = {
        ...columnData,
        columns: {
          ...columnData.columns,
          [newColumn.id]: newColumn,
        },
      };
      setColumnData(newData);
      return;
    }
    //cross column moving
    const startTraitIds = Array.from(start.traitIds);
    startTraitIds.splice(source.index, 1);
    const newStart = {
      ...start,
      traitIds: startTraitIds,
    };

    const finishTraitIds = Array.from(finish.traitIds);
    finishTraitIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      traitIds: finishTraitIds,
    };

    const newData = {
      ...columnData,
      columns: {
        ...columnData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setColumnData(newData);
  };

  function swipe(direction) {
    const api: ?SensorAPI = sensorAPIRef.current;
    if (!api) {
      console.warn("unable to find sensor api");
      return null;
    }
    let endX;
    if (direction === "right") {
      endX = 100;
    } else {
      endX = -100;
    }
    const start = { x: 0, y: 0 };
    const end = { x: endX, y: 0 };

    const preDrag = api.tryGetLock(columnData.columns.column2.traitIds[0]);

    if (!preDrag) {
      console.warn("unable to start capturing");
      return null;
    }

    const drag = preDrag.fluidLift(start);

    const points = [];

    for (let i = 0; i < 20; i++) {
      points.push({
        x: tweenFunctions.easeOutCirc(i, start.x, end.x, 20),
        y: tweenFunctions.easeOutCirc(i, start.y, end.y, 20),
      });
    }
    moveStepByStep(drag, points);
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      console.log("left swiped");
      swipe("left");
    },
    onSwipedRight: () => {
      console.log("right swiped");
      swipe("right");
    },
  });

  function moveStepByStep(drag, values) {
    requestAnimationFrame(() => {
      const newPosition = values.shift();
      drag.move(newPosition);
      if (values.length) {
        moveStepByStep(drag, values);
      } else {
        drag.drop();
      }
    });
  }

  // Block native overscroll/scroll on touch so drag gestures stay clean. Must
  // be `passive: false` to call preventDefault, and we cleanup so re-mounts
  // (Strict Mode, HMR) don't pile up listeners.
  useEffect(() => {
    const onTouchMove = (e) => {
      e.preventDefault();
    };
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => window.removeEventListener("touchmove", onTouchMove);
  }, []);

  // Persist progress data whenever it changes
  useEffect(() => {
    saveProgress(progressData);
  }, [progressData]);

  return (
    <div>
      <DragDropContext
        onDragEnd={onDragEnd}
        sensors={[
          (api) => {
            sensorAPIRef.current = api;
          },
        ]}
      >
        <ProgressContext.Provider
          value={{
            progress: [progress, setProgress],
            activeStep: [activeStep, setActiveStep],
          }}
        >
          <TutorialContext.Provider
            value={{ tutorialStrings: [tutorialStrings, setTutorialStrings] }}
          >
            <UndoContext.Provider value={{ undoFunction }}>
              <ResetContext.Provider value={reset}>
                <ThemeProvider theme={appTheme}>
                  <NavBar history={history} />
                  <ResumePrompt
                    open={resumePromptOpen}
                    stage={resumeStage}
                    onResume={handleResume}
                    onStartOver={handleStartOver}
                  />
                  <Route exact path="/">
                    <Redirect to="/Selection" />
                  </Route>
                  <Route
                    exact
                    path="/Selection/:id?"
                    children={
                      <SelectionPage
                        columnData={columnData}
                        setColumnData={setColumnData}
                        topTraits={topTraits}
                        setTopTraits={setTopTraits}
                        history={history}
                        swipeHandlers={swipeHandlers}
                        progressData={progressData}
                        setProgressData={setProgressData}
                      />
                    }
                  />
                  <Route path="/Rank">
                    <RankingPage
                      topTraits={topTraits}
                      setTopTraits={setTopTraits}
                      history={history}
                      initalProgress={progressData}
                      setProgressData={setProgressData}
                      progressData={progressData}
                    />
                  </Route>
                  <Route path="/Results">
                    <ResultsPage
                      topTraits={topTraits}
                      setTopTraits={setTopTraits}
                      userID={userId}
                      progressData={progressData}
                      setProgressData={setProgressData}
                    />
                  </Route>
                  <Route
                    path="/Share/:id"
                    children={
                      <SharedPage
                        columnData={columnData}
                        setColumnData={setColumnData}
                        history={history}
                      />
                    }
                  />
                </ThemeProvider>
              </ResetContext.Provider>
            </UndoContext.Provider>
          </TutorialContext.Provider>
        </ProgressContext.Provider>
      </DragDropContext>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
};

export default AppWrapper;
