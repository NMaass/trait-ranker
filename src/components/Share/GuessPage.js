import React, { useEffect, useRef, useState } from "react";
import { Grid } from "@mui/material";
import RankingTrait from "../TraitCards/RankingTrait";
import initialTraits from "../Selection/initialTraits";
import shuffle from "../../utils/ShuffleUtil";
import ReorderableColumn from "./ReorderableColumn";
import ReorderGuess from "./ReorderGuess";
import useBreakpoint from "../../utils/useBreakpoint";
import { trackGuessed } from "../../utils/mixpanel";
import FadeTextSeries from "../../utils/FadeTextSeries";

const GuessPage = ({ traits, columnData, setColumnData, history }) => {
  let traitsLeft = useRef(shuffle(traits.slice(0, 7)));
  let wrongTraits = useRef([]);
  let finalList = useRef([]);
  const [colors, setColors] = useState([]);
  const [isDraggable, setIsDraggable] = useState(true);

  const [currentTraits, setCurrentTraits] = useState([]);
  const [showPicks, setShowPicks] = useState(true);
  const [showColumn, setShowColumn] = useState(false);
  const [showTryIt, setShowIt] = useState(false);
  const [showLockIn, setShowLockIn] = useState(true);

  useEffect(() => {
    // Build 7 "red herring" wrong traits from the shared pool. Copy first:
    // the old code aliased initialTraits.columns.column2.traitIds and spliced
    // it in place, permanently truncating the real Selection deck (a shared
    // module singleton) for the rest of the session once Guess ran.
    const pool = [...initialTraits.columns.column2.traitIds];
    for (let i = 0; i < pool.length && wrongTraits.current.length < 7; i++) {
      if (!traitsLeft.current.includes(pool[i])) {
        wrongTraits.current.push(pool[i]);
      }
    }
    loadNextTraits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePick = (pick) => {
    finalList.current.push(pick);
    if (traitsLeft.current.length === 0) {
      const newTraits = {
        ...columnData.columns.guessing,
        traitIds: finalList.current,
      };
      const newColumnData = {
        ...columnData,
        columns: {
          ...columnData.columns,
          guessing: newTraits,
        },
      };
      setColumnData(newColumnData);
      trackGuessed(newColumnData.columns.guessing);
      setShowColumn(true);
      setShowPicks(false);
    }
    loadNextTraits();
  };
  const loadNextTraits = () => {
    setCurrentTraits(
      shuffle([traitsLeft.current.pop(), wrongTraits.current.pop()])
    );
  };
  const onDone = () => {
    let guessColors = [];
    const correctTraits = traits.slice(0, 7);
    const guess = columnData.columns.guessing.traitIds;
    for (let i = 0; i < correctTraits.length; i++) {
      if (correctTraits[i] === guess[i]) {
        guessColors.push("green");
      } else if (correctTraits.includes(guess[i])) {
        guessColors.push("gold");
      } else {
        guessColors.push("LightGray");
      }
    }
    setColors(guessColors);
    setShowIt(true);
    setShowLockIn(false);
    setIsDraggable(false);
  };

  const { isDesktop } = useBreakpoint();

  const guessTutorial = [
    "Select the traits actually in the list.",
    "Press the ? button at any time to see an example.",
  ];
  return (
    <div>
      {showPicks && (
        <Grid
          container
          spacing={isDesktop ? 60 : 3}
          alignItems="center"
          justifyContent="center"
          direction={isDesktop ? "row" : "column"}
        >
          <Grid item>
            <RankingTrait
              onClick={() => handlePick(currentTraits[0])}
              trait={currentTraits[0]}
            />
          </Grid>
          <Grid item>
            <RankingTrait
              onClick={() => handlePick(currentTraits[1])}
              trait={currentTraits[1]}
            />
          </Grid>
        </Grid>
      )}
      {showColumn && (
        <ReorderGuess
          column={columnData.columns.guessing}
          onDone={onDone}
          colors={colors}
          showTryIt={showTryIt}
          showLockIn={showLockIn}
          history={history}
          isDraggable={isDraggable}
        />
      )}
    </div>
  );
};
export default GuessPage;
