import { useState, useEffect } from "react";

function useMergeSort(initialTraits, initialState = null) {
  // Constants
  const TOP_K = 7;

  // State Variables
  const [currentMatch, setCurrentMatch] = useState(
    initialState?.currentMatch || null
  );
  const [currentStanding, setCurrentStanding] = useState(
    initialState?.currentStanding || []
  );
  const [isComplete, setIsComplete] = useState(
    initialState?.isComplete || false
  );
  const [progressPercent, setProgressPercent] = useState(
    initialState?.progressPercent || 0
  );
  const [comparisonStack, setComparisonStack] = useState(
    initialState?.comparisonStack || []
  );
  const [mergeStack, setMergeStack] = useState(initialState?.mergeStack || []);
  const [totalComparisons, setTotalComparisons] = useState(
    initialState?.totalComparisons || 0
  );
  const [comparisonsMade, setComparisonsMade] = useState(
    initialState?.comparisonsMade || 0
  );

  useEffect(() => {
    if (!initialState) {
      initializeSort(initialTraits);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTraits]);

  function initializeSort(traitList) {
    if (!traitList || traitList.length === 0) {
      setIsComplete(true);
      setProgressPercent(100);
      setCurrentStanding([]);
      setCurrentMatch(null);
      return;
    }

    // Initialize merge stack with individual traits
    const initialSublists = traitList.map((trait) => [trait]);

    setMergeStack([initialSublists]);
    setTotalComparisons(calculateTotalComparisons(traitList.length));
    setComparisonsMade(0);
    setProgressPercent(0);
    setIsComplete(false);
    setCurrentStanding([]);

    prepareNextComparison([initialSublists], []);
  }

  function prepareNextComparison(currentMergeStack, currentComparisonStack) {
    if (
      currentMergeStack.length === 1 &&
      currentMergeStack[0].length === 1 &&
      currentComparisonStack.length === 0
    ) {
      // Only one sublist remains and no pending comparisons
      finalizeSort(currentMergeStack);
      return;
    }

    const currentLevel = currentMergeStack[currentMergeStack.length - 1];

    // If the current level has no sublists, pop it and move to the next level
    if (currentLevel.length === 0) {
      currentMergeStack.pop();
      setMergeStack([...currentMergeStack]);
      prepareNextComparison(currentMergeStack, currentComparisonStack);
      return;
    }

    // If the current level has only one sublist, move it up to the next level
    if (currentLevel.length === 1) {
      const mergedSublist = currentLevel.shift();

      currentMergeStack.pop();

      if (currentMergeStack.length === 0) {
        // Sorting complete
        setCurrentStanding(mergedSublist.slice(0, TOP_K));
        setIsComplete(true);
        setProgressPercent(100);
        setCurrentMatch(null);
        return;
      } else {
        // Add merged sublist to the next level
        if (!currentMergeStack[currentMergeStack.length - 1]) {
          currentMergeStack.push([]);
        }
        const nextLevel = currentMergeStack[currentMergeStack.length - 1];
        nextLevel.push(mergedSublist);
        setMergeStack([...currentMergeStack]);
        prepareNextComparison(currentMergeStack, currentComparisonStack);
        return;
      }
    }

    // Get the first two sublists to merge
    const leftSublist = currentLevel.shift();
    const rightSublist = currentLevel.shift();

    // Initialize the merged sublist
    const mergedSublist = [];

    // Push the current merge context onto the comparison stack
    currentComparisonStack.push({
      leftSublist,
      rightSublist,
      mergedSublist,
      leftIndex: 0,
      rightIndex: 0,
    });

    setMergeStack([...currentMergeStack]);
    setComparisonStack([...currentComparisonStack]);

    // Start the first comparison
    getNextComparison(currentComparisonStack);
  }

  function getNextComparison(currentComparisonStack) {
    const currentMerge =
      currentComparisonStack[currentComparisonStack.length - 1];

    if (!currentMerge) {
      // No more comparisons
      prepareNextComparison(mergeStack, currentComparisonStack);
      return;
    }

    const { leftSublist, rightSublist, leftIndex, rightIndex } = currentMerge;

    const leftTrait =
      leftSublist && leftIndex < leftSublist.length
        ? leftSublist[leftIndex]
        : null;
    const rightTrait =
      rightSublist && rightIndex < rightSublist.length
        ? rightSublist[rightIndex]
        : null;

    if (leftTrait && rightTrait) {
      setCurrentMatch({ left: leftTrait, right: rightTrait });
    } else {
      // Add any remaining traits to merged sublist
      if (leftIndex < leftSublist.length) {
        currentMerge.mergedSublist.push(...leftSublist.slice(leftIndex));
      }
      if (rightIndex < rightSublist.length) {
        currentMerge.mergedSublist.push(...rightSublist.slice(rightIndex));
      }

      // Remove current merge from stack
      currentComparisonStack.pop();
      setComparisonStack([...currentComparisonStack]);

      // Add merged sublist to the next level
      addMergedSublistToNextLevel(currentMerge.mergedSublist, mergeStack);

      // Continue with next comparison
      prepareNextComparison(mergeStack, currentComparisonStack);
    }
  }
  function matchWin(winner) {
    const currentComparisonStack = [...comparisonStack];
    const currentMerge =
      currentComparisonStack[currentComparisonStack.length - 1];

    if (!currentMerge) {
      console.warn("matchWin called after sorting is complete");
      return;
    }

    const { leftSublist, rightSublist, mergedSublist, leftIndex, rightIndex } =
      currentMerge;

    const leftTrait = leftSublist && leftSublist[leftIndex];
    const rightTrait = rightSublist && rightSublist[rightIndex];

    // Add the winner to the merged sublist
    mergedSublist.push(winner);

    // Initialize selectionHistory if it doesn't exist
    if (!currentMerge.selectionHistory) {
      currentMerge.selectionHistory = [];
    }

    // Record the winner's side ('left' or 'right')
    if (winner === leftTrait) {
      currentMerge.leftIndex += 1;
      currentMerge.selectionHistory.push("left");
    } else if (winner === rightTrait) {
      currentMerge.rightIndex += 1;
      currentMerge.selectionHistory.push("right");
    }

    setComparisonStack(currentComparisonStack);

    // Update comparisons made
    setComparisonsMade((prev) => {
      const newComparisonsMade = prev + 1;
      updateProgress(newComparisonsMade);
      return newComparisonsMade;
    });

    // Prepare the next comparison
    getNextComparison(currentComparisonStack);
  }

  function addMergedSublistToNextLevel(mergedSublist, currentMergeStack) {
    // Ensure the next level exists
    if (currentMergeStack.length === 1) {
      currentMergeStack.unshift([]);
    }

    const nextLevelIndex = currentMergeStack.length - 2;
    const nextLevel = currentMergeStack[nextLevelIndex];
    nextLevel.push(mergedSublist);

    if (currentMergeStack[currentMergeStack.length - 1].length === 0) {
      // Current level merges are complete, move to next level
      currentMergeStack.pop();
    }

    setMergeStack([...currentMergeStack]);
  }
  function finalizeSort(currentMergeStack) {
    let finalList = [];

    if (currentMergeStack.length > 0 && currentMergeStack[0].length > 0) {
      finalList = currentMergeStack[0][0];
    }

    console.log("Final list:", finalList);

    setCurrentStanding(finalList.slice(0, TOP_K));
    setIsComplete(true);
    setProgressPercent(100);
    setCurrentMatch(null);
  }

  function updateProgress(newComparisonsMade) {
    const progress = Math.min(
      (newComparisonsMade / totalComparisons) * 100,
      100
    );
    setProgressPercent(progress);
  }

  function calculateTotalComparisons(n) {
    let totalComparisons = 0;
    let levelSize = 1;

    while (levelSize < n) {
      totalComparisons += Math.ceil(n / (2 * levelSize)) * levelSize;
      levelSize *= 2;
    }

    return totalComparisons;
  }

  function revertMatch() {
    if (comparisonStack.length === 0) {
      console.warn("No moves to revert");
      return;
    }

    const currentComparisonStack = [...comparisonStack];
    const currentMerge =
      currentComparisonStack[currentComparisonStack.length - 1];

    const { mergedSublist, selectionHistory } = currentMerge;

    if (!selectionHistory || selectionHistory.length === 0) {
      // No moves to revert in the current merge; pop back to previous merge
      currentComparisonStack.pop();
      setComparisonStack(currentComparisonStack);

      // Restore currentMatch from the previous merge if available
      if (currentComparisonStack.length > 0) {
        const previousMerge =
          currentComparisonStack[currentComparisonStack.length - 1];
        const prevLeftTrait =
          previousMerge.leftSublist[previousMerge.leftIndex];
        const prevRightTrait =
          previousMerge.rightSublist[previousMerge.rightIndex];
        setCurrentMatch({ left: prevLeftTrait, right: prevRightTrait });
      } else {
        // No previous merges; sorting has not started
        setCurrentMatch(null);
      }

      return;
    }

    // Remove the last selected trait
    mergedSublist.pop();

    // Remove the last selection from selectionHistory
    const lastWinnerSide = selectionHistory.pop();

    // Decrement comparisons made
    setComparisonsMade((prev) => {
      const newComparisonsMade = prev > 0 ? prev - 1 : 0;
      updateProgress(newComparisonsMade);
      return newComparisonsMade;
    });

    // Decrement index of the last move based on lastWinnerSide
    if (lastWinnerSide === "left") {
      currentMerge.leftIndex -= 1;
    } else if (lastWinnerSide === "right") {
      currentMerge.rightIndex -= 1;
    }

    setComparisonStack(currentComparisonStack);

    // Set isComplete to false if it was true
    if (isComplete) {
      setIsComplete(false);
      setProgressPercent((comparisonsMade / totalComparisons) * 100);
    }

    // Restore currentMatch
    const leftTrait = currentMerge.leftSublist[currentMerge.leftIndex] || null;
    const rightTrait =
      currentMerge.rightSublist[currentMerge.rightIndex] || null;

    if (leftTrait && rightTrait) {
      setCurrentMatch({ left: leftTrait, right: rightTrait });
    } else {
      // If no traits left to compare in current merge, move back to previous merge
      currentComparisonStack.pop();
      setComparisonStack(currentComparisonStack);
      // Prepare next comparison from the previous state
      if (currentComparisonStack.length > 0) {
        getNextComparison(currentComparisonStack);
      } else {
        setCurrentMatch(null);
      }
    }
  }

  const rankingState = {
    currentMatch,
    currentStanding,
    isComplete,
    progressPercent,
    comparisonStack,
    mergeStack,
    totalComparisons,
    comparisonsMade,
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
