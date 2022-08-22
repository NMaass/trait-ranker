import React, { useEffect, useRef } from "react";
import RankingTrait from "./TraitCards/RankingTrait";
import { Grid, useMediaQuery, Box } from "@mui/material";
import FadeTextSeries from "../utils/FadeTextSeries";
import { trackRankingPage } from "../utils/mixpanel";

const RankingPage = ({ topTraits, setTopTraits, history, finalList }) => {
  const [displayedPairs, setDisplayedPairs] = React.useState(
    topTraits.slice(0, 2)
  );

  let initialPairs = useRef([]);
  let sortedPairs = useRef([]);
  let sortingPair = useRef([]);

  let joinStack = useRef([]);
  let mergeStack = useRef([]);

  let leftGuess = useRef(0);
  let rightGuess = useRef(0);

  let finishedList = useRef([]);
  let unevenList = useRef(null);

  useEffect(() => {
    let initialTraits = topTraits;
    setDisplayedPairs(initialTraits.slice(0, 2));

    if (initialTraits.length % 2) {
      //initialize finished list with first element if uneven
      unevenList.current = initialTraits.pop();
    }
    for (let i = 0; i < initialTraits.length; i += 2) {
      //generate pairs for the user to sort
      initialPairs.current.push([initialTraits[i], initialTraits[i + 1]]);
    }
  }, []);

  const handlePick = (pick) => {
    //looks at which arrays are empty to determine what stage the sort is in
    console.log("pick: " + pick);
    const listLen = finishedList.current.length;
    if (listLen > 6) {
      console.log("the list length:", listLen);
      finishedList.current = finishedList.current.slice(listLen - 7);
    }

    if (joinStack.current.length !== 0) {
      //checking for 'easy' joins
      doJoinRound(pick);
    } else if (mergeStack.current.length !== 0) {
      doMergeRound(pick);
    }

    if (initialPairs.current.length !== 0) {
      //sorting pairs
      doInitialRound(pick);
    }

    let mergeStackHasValues = mergeStack.current.some(function (any) {
      return any.length;
    }); //check if all arrays are empty
    if (!mergeStackHasValues && initialPairs.current.length === 0) {
      if (sortedPairs.current.length === 0) {
        setTopTraits(finishedList.current);
        console.log("finished the list" + finishedList.current);
        history.push("/Results");
      } else {
        buildMerge(sortedPairs.current[0]);
      }
    }

    console.log("initialPairs: ", initialPairs.current);
    console.log("sortedPairs: ", sortedPairs.current);
    console.log("finished list: ", finishedList.current);
    console.log("Join stack: ", joinStack.current);
    console.log("mergeStack", mergeStack.current);
  };

  const doInitialRound = (pick) => {
    if (pick === initialPairs.current[0][0]) {
      initialPairs.current[0].reverse();
      console.log("reversed ", initialPairs.current[0]);
    }

    sortedPairs.current.push(initialPairs.current.shift());

    setDisplayedPairs(initialPairs.current[0]);
    if (initialPairs.current.length === 2) {
      //set up the merges one render ahead
      if (unevenList.current !== null) {
        //populate finished list with uneven element
        finishedList.current.push(unevenList.current);
        console.log("Prepping for round uneven");
      } else {
        finishedList.current = sortedPairs.current.shift(); //populate list with first sorted pair
        console.log("Prepping for round 2");
      }
    }
  };

  const doJoinRound = (pick) => {
    if (joinStack.current.length === 2) {
      //check if left or right join
      if (pick === sortingPair.current[0]) {
        finishedList.current = finishedList.current.concat(sortingPair.current); //a 'successful' join
        clearStacks();
      } else {
        joinStack.current.shift();
        setDisplayedPairs(joinStack.current[0]);
      }
    } else {
      if (pick === sortingPair.current[1]) {
        joinStack.current = [];
        setDisplayedPairs(mergeStack.current[0][0]);
      } else {
        finishedList.current = sortingPair.current.concat(finishedList.current);
        clearStacks();
      }
    }
  };

  const doMergeRound = (pick) => {
    if (displayedPairs[0] === sortingPair.current[0]) {
      if (pick !== displayedPairs[0]) {
        //found what is liked more and placing it in the sorted list
        finishedList.current.splice(
          leftGuess.current,
          0,
          sortingPair.current[0]
        );
        mergeStack.current[0] = [];
      } else {
        //tries next item in current sorted list
        mergeStack.current[0].shift();
        leftGuess.current++;
        console.log("leftGuess ", leftGuess.current);
        //tries to shift back and forth between items to reduce fatigue
        if (mergeStack.current[0].length === 0) {
          finishedList.current.splice(
            leftGuess.current,
            0,
            sortingPair.current[0]
          );
          mergeStack.current[0].shift();
        }
      }
      if (mergeStack.current[1].length !== 0) {
        setDisplayedPairs(mergeStack.current[1][0]);
      } else {
        setDisplayedPairs(mergeStack.current[0][0]);
      }
    } else {
      // higher
      if (pick === displayedPairs[0]) {
        finishedList.current.splice(
          rightGuess.current + 1,
          0,
          sortingPair.current[1]
        );
        mergeStack.current[1] = [];
      } else {
        mergeStack.current[1].shift();
        rightGuess.current--;
        console.log("rightGuess ", rightGuess.current);
        if (mergeStack.current[1].length === 0) {
          finishedList.current.splice(
            rightGuess.current + 1,
            0,
            sortingPair.current[1]
          );
          mergeStack.current[1].shift();
        }
      }
      if (mergeStack.current[0].length !== 0) {
        setDisplayedPairs(mergeStack.current[0][0]);
      } else {
        setDisplayedPairs(mergeStack.current[1][0]);
      }
    }
  };

  const buildMerge = (list) => {
    console.log("building round 2");
    buildJoinStack(list);
    buildMergeStack(list);
    sortingPair.current = sortedPairs.current.shift();
    leftGuess.current = 0;
    rightGuess.current = finishedList.current.length;
  };

  const buildJoinStack = (list) => {
    joinStack.current.push([
      list[0],
      finishedList.current[finishedList.current.length - 1],
    ]);
    joinStack.current.push([list[1], finishedList.current[0]]);
    setDisplayedPairs(joinStack.current[0]);
    console.log("Initial Join stack: ", joinStack.current);
  };

  const buildMergeStack = (list) => {
    let leftMergeStack = [];
    let rightMergeStack = [];

    for (let i = 0; i < finishedList.current.length; i++) {
      leftMergeStack.push([list[0], finishedList.current[i]]);
    }
    for (let i = finishedList.current.length - 1; i >= 0; i--) {
      rightMergeStack.push([list[1], finishedList.current[i]]);
    }
    mergeStack.current = [leftMergeStack, rightMergeStack];
    console.log("initial mergeStack", mergeStack.current);
  };
  const clearStacks = () => {
    joinStack.current = [];
    mergeStack.current = [];
    sortingPair.current = [];
  };

  const isMobile = useMediaQuery("(min-width:1024px)");

  useEffect(() => {
    trackRankingPage(topTraits);
  }, []);

  return (
    <div>
      <Grid
        container
        spacing={isMobile ? 60 : 1}
        alignItems="center"
        justifyContent="center"
        direction={isMobile ? "row" : "column"}
      >
        <Grid item>
          <FadeTextSeries
              stringArray={['this is the ranking page', 'this is a test of a very ']}
              variant={isMobile ? "h3" : "h5"}/>
        </Grid>
        <Grid item>
          <RankingTrait
            onClick={() => handlePick(displayedPairs[0])}
            trait={displayedPairs[0]}
          />
        </Grid>
        <Grid item>
          <RankingTrait
            onClick={() => handlePick(displayedPairs[1])}
            trait={displayedPairs[1]}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default RankingPage;
