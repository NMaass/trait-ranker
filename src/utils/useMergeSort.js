import { useState, useEffect, useRef } from "react";

function useMergeSort(initialTraits, initialState) {
  // Constants
  const TOP_K = 7;

  // State Variables
  const history = useRef([]);
  const [currentState, setCurrentState] = useState(null);

  // Refs to persist state across re-renders
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!isInitializedRef.current) {
      if (isResumableInitialState(initialState, initialTraits)) {
        // Resume from persisted state. Treat the snapshot as the only history
        // entry so the next revert returns to it (not undefined).
        const snapshot = normalizeResumeState(initialState, initialTraits);
        history.current = [snapshot];
        setCurrentState(snapshot);
      } else {
        const final = prepareNextComparison(buildInitialState(initialTraits));
        history.current = [final];
        setCurrentState(final);
      }
      isInitializedRef.current = true;
    }
    // We intentionally do not depend on initialState/initialTraits beyond
    // mount; re-initializing mid-sort would discard in-flight comparisons.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function isResumableInitialState(state, traits) {
    if (!state || typeof state !== "object") return false;
    if (state.isComplete) return false;
    if (!Array.isArray(state.mergeStack)) return false;
    if (!state.currentMatch) return false;
    if (!Array.isArray(traits) || traits.length === 0) return false;
    return true;
  }

  function normalizeResumeState(state, traits) {
    const totalComparisons =
      state.totalComparisons ?? calculateTotalComparisons(traits.length);
    return {
      mergeStack: state.mergeStack,
      comparisonStack: state.comparisonStack ?? [],
      currentMatch: state.currentMatch,
      currentStanding: state.currentStanding ?? [],
      isComplete: false,
      progressPercent: state.progressPercent ?? 0,
      comparisonsMade: state.comparisonsMade ?? 0,
      totalComparisons,
    };
  }

  function buildInitialState(traitList) {
    if (!traitList || traitList.length === 0) {
      return {
        mergeStack: [],
        comparisonStack: [],
        currentMatch: null,
        currentStanding: [],
        isComplete: true,
        progressPercent: 100,
        comparisonsMade: 0,
        totalComparisons: 0,
      };
    }
    const initialSublists = traitList.map((trait) => [trait]);
    const totalComparisons = calculateTotalComparisons(traitList.length);
    return {
      mergeStack: [initialSublists],
      comparisonStack: [],
      currentMatch: null,
      currentStanding: [],
      isComplete: false,
      progressPercent: 0,
      comparisonsMade: 0,
      totalComparisons,
    };
  }

  // Pure function: given a state, walk the merge stack until we either reach
  // completion or set up the next user-facing comparison. Returns the final
  // state. The caller is responsible for setCurrentState + history.
  function prepareNextComparison(state) {
    const { mergeStack, comparisonStack } = state;

    if (
      mergeStack.length === 1 &&
      mergeStack[0].length === 1 &&
      comparisonStack.length === 0
    ) {
      const finalList = mergeStack[0][0];
      return {
        ...state,
        currentStanding: finalList.slice(0, TOP_K),
        isComplete: true,
        progressPercent: 100,
        currentMatch: null,
      };
    }

    if (mergeStack.length === 0) {
      // Defensive: nothing left to do.
      return { ...state, currentMatch: null, isComplete: true, progressPercent: 100 };
    }

    const currentLevel = mergeStack[mergeStack.length - 1];

    if (currentLevel.length === 0) {
      // Empty level — drop it and recurse.
      return prepareNextComparison({
        ...state,
        mergeStack: mergeStack.slice(0, -1),
      });
    }

    if (currentLevel.length === 1) {
      const lastSublist = currentLevel[0];
      const newMergeStack = mergeStack.slice(0, -1);

      if (newMergeStack.length === 0) {
        return {
          ...state,
          currentStanding: lastSublist.slice(0, TOP_K),
          isComplete: true,
          progressPercent: 100,
          currentMatch: null,
        };
      }
      const updatedLevel = [
        ...newMergeStack[newMergeStack.length - 1],
        lastSublist,
      ];
      newMergeStack[newMergeStack.length - 1] = updatedLevel;
      return prepareNextComparison({ ...state, mergeStack: newMergeStack });
    }

    // Pull the next two sublists out of the current level and into a fresh
    // comparison frame.
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

    return {
      ...state,
      mergeStack: newMergeStack,
      comparisonStack: newComparisonStack,
      currentMatch: { left: leftSublist[0], right: rightSublist[0] },
    };
  }

  function matchWin(winner) {
    if (!currentState) return;
    if (currentState.comparisonStack.length === 0) {
      const final = prepareNextComparison(currentState);
      setCurrentState(final);
      history.current = [...history.current, final];
      return;
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

    let newLeftIndex = leftIndex;
    let newRightIndex = rightIndex;
    if (winner === leftTrait) newLeftIndex += 1;
    else newRightIndex += 1;

    const newMergedSublist = [...mergedSublist, winner];
    const newCurrentMerge = {
      ...currentMerge,
      mergedSublist: newMergedSublist,
      leftIndex: newLeftIndex,
      rightIndex: newRightIndex,
    };

    const newComparisonStack = [...currentComparisonStack];
    newComparisonStack[newComparisonStack.length - 1] = newCurrentMerge;

    let newMergeStack = mergeStack.map((level) =>
      level.map((sublist) => [...sublist])
    );

    const newComparisonsMade = comparisonsMade + 1;
    const progressPercent = Math.min(
      (newComparisonsMade / Math.max(totalComparisons, 1)) * 100,
      100
    );

    let nextState;
    if (
      newLeftIndex < leftSublist.length &&
      newRightIndex < rightSublist.length
    ) {
      // Next comparison in the current merge
      nextState = {
        ...state,
        mergeStack: newMergeStack,
        comparisonStack: newComparisonStack,
        currentMatch: {
          left: leftSublist[newLeftIndex],
          right: rightSublist[newRightIndex],
        },
        comparisonsMade: newComparisonsMade,
        progressPercent,
      };
    } else {
      // Sublist(s) exhausted — flush remainders, finish this merge.
      const remainingLeft = leftSublist.slice(newLeftIndex);
      const remainingRight = rightSublist.slice(newRightIndex);
      const finalMergedSublist = [
        ...newMergedSublist,
        ...remainingLeft,
        ...remainingRight,
      ];
      newComparisonStack.pop();

      if (newMergeStack.length === 0) {
        newMergeStack = [[finalMergedSublist]];
      } else {
        const idx = newMergeStack.length - 1;
        newMergeStack[idx] = [...newMergeStack[idx], finalMergedSublist];
      }

      const intermediate = {
        ...state,
        mergeStack: newMergeStack,
        comparisonStack: newComparisonStack,
        comparisonsMade: newComparisonsMade,
        progressPercent,
      };

      if (newComparisonStack.length > 0) {
        const nextMerge = newComparisonStack[newComparisonStack.length - 1];
        nextState = {
          ...intermediate,
          currentMatch: {
            left: nextMerge.leftSublist[nextMerge.leftIndex],
            right: nextMerge.rightSublist[nextMerge.rightIndex],
          },
        };
      } else {
        // No active merges — let prepareNextComparison set up the next round
        // (or detect completion).
        nextState = prepareNextComparison(intermediate);
      }
    }

    setCurrentState(nextState);
    history.current = [...history.current, nextState];
  }

  function revertMatch() {
    // history.current always contains the current state as its last entry.
    // To revert we drop the current state and return to the one before it.
    if (history.current.length < 2) {
      console.warn("No moves to revert");
      return;
    }
    const newHistory = history.current.slice(0, -1);
    const previousState = newHistory[newHistory.length - 1];
    history.current = newHistory;
    setCurrentState(previousState);
  }

  function calculateTotalComparisons(n) {
    if (!n || n <= 1) return 1; // Guard div-by-zero; trivially "done".
    return Math.ceil(n * Math.log2(n));
  }

  const { currentMatch, currentStanding, isComplete, progressPercent } =
    currentState || {};

  return {
    progressPercent,
    currentStanding,
    currentMatch,
    matchWin,
    revertMatch,
    isComplete,
    rankingState: { ...currentState },
    comparisonsMade: currentState?.comparisonsMade,
  };
}

export default useMergeSort;
