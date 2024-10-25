import { useState, useEffect, useRef } from "react";

function useMergeSort(initialTraits) {
  // Constants
  const TOP_K = 7;

  // State Variables
  const history = useRef([]);
  const [currentState, setCurrentState] = useState(null);

  // Refs to persist state across re-renders
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!isInitializedRef.current) {
      initializeSort(initialTraits);
      isInitializedRef.current = true;
    }
  }, [initialTraits]);

  function initializeSort(traitList) {
    if (!traitList || traitList.length === 0) {
      const initialStateSnapshot = {
        mergeStack: [],
        comparisonStack: [],
        currentMatch: null,
        currentStanding: [],
        isComplete: true,
        progressPercent: 100,
        comparisonsMade: 0,
        totalComparisons: 0,
      };
      history.current = [initialStateSnapshot];
      setCurrentState(initialStateSnapshot);
      return;
    }

    // Initialize merge stack with individual traits
    const initialSublists = traitList.map((trait) => [trait]);
    const totalComparisons = calculateTotalComparisons(traitList.length);

    const initialStateSnapshot = {
      mergeStack: [initialSublists],
      comparisonStack: [],
      currentMatch: null,
      currentStanding: [],
      isComplete: false,
      progressPercent: 0,
      comparisonsMade: 0,
      totalComparisons,
    };

    // Prepare the first comparison without updating history
    prepareNextComparison(initialStateSnapshot);
  }

  function prepareNextComparison(state) {
    const { mergeStack, comparisonStack } = state;

    if (
      mergeStack.length === 1 &&
      mergeStack[0].length === 1 &&
      comparisonStack.length === 0
    ) {
      // Sorting complete
      const finalList = mergeStack[0][0];
      const newState = {
        ...state,
        currentStanding: finalList.slice(0, TOP_K),
        isComplete: true,
        progressPercent: 100,
        currentMatch: null,
      };
      setCurrentState(newState);
      return;
    }

    const currentLevel = mergeStack[mergeStack.length - 1];

    if (currentLevel.length === 0) {
      // Move to the next level
      const newMergeStack = mergeStack.slice(0, -1);
      const newState = { ...state, mergeStack: newMergeStack };
      prepareNextComparison(newState);
      return;
    }

    if (currentLevel.length === 1) {
      // Move the last sublist up a level
      const lastSublist = currentLevel[0];
      const newMergeStack = mergeStack.slice(0, -1);

      if (newMergeStack.length === 0) {
        // Sorting complete
        const newState = {
          ...state,
          currentStanding: lastSublist.slice(0, TOP_K),
          isComplete: true,
          progressPercent: 100,
          currentMatch: null,
        };
        setCurrentState(newState);
        return;
      } else {
        const updatedLevel = [
          ...newMergeStack[newMergeStack.length - 1],
          lastSublist,
        ];
        newMergeStack[newMergeStack.length - 1] = updatedLevel;
        const newState = { ...state, mergeStack: newMergeStack };
        prepareNextComparison(newState);
        return;
      }
    }

    // Prepare the next comparison
    const leftSublist = currentLevel[0];
    const rightSublist = currentLevel[1];
    const remainingSublists = currentLevel.slice(2);

    const newCurrentLevel = [...remainingSublists];
    const newMergeStack = [...mergeStack.slice(0, -1), newCurrentLevel];

    const newComparison = {
      leftSublist,
      rightSublist,
      mergedSublist: [],
      leftIndex: 0,
      rightIndex: 0,
    };

    const newComparisonStack = [...comparisonStack, newComparison];

    const leftTrait = leftSublist[0];
    const rightTrait = rightSublist[0];

    const newState = {
      ...state,
      mergeStack: newMergeStack,
      comparisonStack: newComparisonStack,
      currentMatch: { left: leftTrait, right: rightTrait },
    };

    setCurrentState(newState);
  }

  function matchWin(winner) {
    if (currentState.comparisonStack.length === 0) {
      prepareNextComparison(currentState);
      history.current = [...history.current, currentState];
      return; // Stop further execution until prepareNextComparison completes
    }

    const state = currentState;
    const { mergeStack, comparisonStack, comparisonsMade, totalComparisons } =
      state;
    // Clone the comparison stack and merge stack to avoid mutations
    const currentComparisonStack = comparisonStack.map((comp) => ({
      ...comp,
      mergedSublist: [...comp.mergedSublist],
    }));
    const currentMerge = {
      ...currentComparisonStack[currentComparisonStack.length - 1],
    };

    const { leftSublist, rightSublist, mergedSublist, leftIndex, rightIndex } =
      currentMerge;

    const leftTrait = leftSublist[leftIndex];
    const rightTrait = rightSublist[rightIndex];

    if (winner !== leftTrait && winner !== rightTrait) {
      console.warn("Winner does not match current traits");
      return;
    }

    // Update indices and mergedSublist immutably
    let newLeftIndex = leftIndex;
    let newRightIndex = rightIndex;

    if (winner === leftTrait) {
      newLeftIndex += 1;
    } else {
      newRightIndex += 1;
    }

    const newMergedSublist = [...mergedSublist, winner];

    // Create updated currentMerge
    const newCurrentMerge = {
      ...currentMerge,
      mergedSublist: newMergedSublist,
      leftIndex: newLeftIndex,
      rightIndex: newRightIndex,
    };

    // Update the comparison stack immutably
    const newComparisonStack = [...currentComparisonStack];
    newComparisonStack[newComparisonStack.length - 1] = newCurrentMerge;

    let newCurrentMatch = null;
    let newMergeStack = mergeStack.map((level) =>
      level.map((sublist) => [...sublist])
    );

    const newComparisonsMade = comparisonsMade + 1;
    const progressPercent = Math.min(
      (newComparisonsMade / totalComparisons) * 100,
      100
    );

    if (
      newLeftIndex < leftSublist.length &&
      newRightIndex < rightSublist.length
    ) {
      // Next comparison in the current merge
      newCurrentMatch = {
        left: leftSublist[newLeftIndex],
        right: rightSublist[newRightIndex],
      };

      const newState = {
        ...state,
        mergeStack: newMergeStack,
        comparisonStack: newComparisonStack,
        currentMatch: newCurrentMatch,
        comparisonsMade: newComparisonsMade,
        progressPercent,
      }; // Update state and add to history
      setCurrentState(newState);
      history.current = [...history.current, newState];
    } else {
      // One or both sublists are exhausted
      // Add remaining items to mergedSublist
      const remainingLeft = leftSublist.slice(newLeftIndex);
      const remainingRight = rightSublist.slice(newRightIndex);
      const finalMergedSublist = [
        ...newMergedSublist,
        ...remainingLeft,
        ...remainingRight,
      ];

      // Remove the completed merge from the stack
      newComparisonStack.pop();

      // Add merged sublist to the next level immutably
      if (newMergeStack.length === 0) {
        newMergeStack = [[finalMergedSublist]];
      } else {
        const updatedLevelIndex = newMergeStack.length - 1;
        const updatedLevel = [
          ...newMergeStack[updatedLevelIndex],
          finalMergedSublist,
        ];
        newMergeStack[updatedLevelIndex] = updatedLevel;
      }

      const newState = {
        ...state,
        mergeStack: newMergeStack,
        comparisonStack: newComparisonStack,
        comparisonsMade: newComparisonsMade,
        progressPercent,
      };
      // Check if there are more comparisons to make
      if (newComparisonStack.length > 0) {
        const nextMerge = newComparisonStack[newComparisonStack.length - 1];
        newCurrentMatch = {
          left: nextMerge.leftSublist[nextMerge.leftIndex],
          right: nextMerge.rightSublist[nextMerge.rightIndex],
        };
        newState.currentMatch = newCurrentMatch;
      } else {
        // No more comparisons at this level, prepare the next one
        prepareNextComparison(newState);
        history.current = [...history.current, newState];
        return;
      }

      // Update state and add to history
      setCurrentState(newState);
      history.current = [...history.current, newState];
    }
  }

  function revertMatch() {
    if (history.current.length < 1) {
      console.error("No moves to revert");
      return;
    }

    // Retrieve the last state from history, removing the current state
    const previousState = history.current[history.current.length - 1];
    history.current = history.current.slice(0, -1);

    setCurrentState(previousState);
  }

  function calculateTotalComparisons(n) {
    return Math.ceil(n * Math.log2(n));
  }

  const { currentMatch, currentStanding, isComplete, progressPercent } =
    currentState || {};

  const rankingState = {
    ...currentState,
  };

  return {
    progressPercent,
    currentStanding,
    currentMatch,
    matchWin,
    revertMatch,
    isComplete,
    rankingState,
  };
}

export default useMergeSort;
