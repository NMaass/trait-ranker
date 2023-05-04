// @flow
import React, { useEffect, useRef, useState, createContext } from "react";
import initialTraits from "./Selection/initialTraits";
import ResultsPage from "./ResultsPage";
import RankingPage from "./RankingPage";
import NavBar from "./NavBar/NavBar";
import { HashRouter, Route, useHistory } from "react-router-dom";
import SelectionPage from "./Selection/SelectionPage";
import ReactGA from "react-ga";
import SharedPage from "./Share/SharedPage";
import { DragDropContext } from "react-beautiful-dnd";
import type { SensorAPI } from "react-beautiful-dnd/src/types";
import { useSwipeable } from "react-swipeable";
import tweenFunctions from "tween-functions";
import { makeAndTrackId } from "../utils/mixpanel";

export const ProgressContext = createContext();

const App = () => {
  const history = useHistory();
  const [columnData, setColumnData] = useState(initialTraits);
  const [topTraits, setTopTraits] = useState([]);
  const [userId, setUserId] = useState(makeAndTrackId(8));
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const sensorAPIRef = useRef<?SensorAPI>(null);
  const TRACKING_ID = "G-4RLGL8ENZC";
  ReactGA.initialize(TRACKING_ID);

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

  useEffect(() => {
    window.addEventListener("touchmove", (e) => {
      e.preventDefault();
    });
  }, []);

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
          <NavBar history={history} />
          <Route exact path="/">
            <SelectionPage
              columnData={columnData}
              topTraits={topTraits}
              setTopTraits={setTopTraits}
              setColumnData={setColumnData}
              history={history}
              swipeHandlers={swipeHandlers}
            />
          </Route>
          <Route path="/Rank">
            <RankingPage
              topTraits={topTraits}
              setTopTraits={setTopTraits}
              history={history}
            />
          </Route>
          <Route path="/Results">
            <ResultsPage
              topTraits={topTraits}
              setTopTraits={setTopTraits}
              userID={userId}
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
        </ProgressContext.Provider>
      </DragDropContext>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <HashRouter basename={"/trait-ranker"}>
      <App />
    </HashRouter>
  );
};

export default AppWrapper;
