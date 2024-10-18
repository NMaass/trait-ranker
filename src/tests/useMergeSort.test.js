// useMergeSort.test.js
import { renderHook, act } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";
import useMergeSort from "../utils/useMergeSort";

describe("useMergeSort Hook", () => {
  test("should sort 20 items to the desired final order", () => {
    const traits = Array.from({ length: 20 }, (_, i) => i + 1); // [1, 2, ..., 20]
    const desiredOrder = traits.slice().sort((a, b) => b - a); // Reverse order

    const { result } = renderHook(() => useMergeSort(traits));

    // Simulate user choices to achieve the desired order
    while (!result.current.isComplete) {
      const { currentMatch } = result.current;

      // Simulate user picking the higher number to sort in descending order
      const winner =
        currentMatch.left > currentMatch.right
          ? currentMatch.left
          : currentMatch.right;

      act(() => {
        result.current.matchWin(winner);
      });
    }

    expect(result.current.isComplete).toBe(true);
    expect(result.current.currentStanding).toEqual(desiredOrder.slice(0, 7));
  });
  test("should undo the last match using revertMatch", () => {
    const traits = [1, 2, 3, 4];
    const { result } = renderHook(() => useMergeSort(traits));

    // First comparison: 1 vs 2, pick 1
    act(() => {
      result.current.matchWin(1);
    });

    // Second comparison: 1 vs 3, pick 3
    act(() => {
      result.current.matchWin(3);
    });

    // Save state after second match
    const stateAfterSecondMatch = { ...result.current };

    // Third comparison: 3 vs 4, pick 3
    act(() => {
      result.current.matchWin(3);
    });

    // Revert the last match
    act(() => {
      result.current.revertMatch();
    });

    // The state should be the same as after the second match
    expect(result.current.currentMatch).toEqual(
      stateAfterSecondMatch.currentMatch
    );
    expect(result.current.comparisonsMade).toEqual(
      stateAfterSecondMatch.comparisonsMade
    );
    expect(result.current.progressPercent).toEqual(
      stateAfterSecondMatch.progressPercent
    );
  });

  test("should resume a partially done sort with initialState", async () => {
    const traits = [1, 2, 3, 4];
    const initialState = {
      currentMatch: { left: 2, right: 3 },
      currentStanding: [],
      isComplete: false,
      progressPercent: 25,
      comparisonStack: [
        {
          leftSublist: [2],
          rightSublist: [3, 4],
          mergedSublist: [1],
          leftIndex: 0,
          rightIndex: 0,
          selectionHistory: [], // This may need to be initialized to reflect any prior selections if applicable
        },
      ],
      mergeStack: [[[1], [2, 3, 4]]],
      totalComparisons: 6,
      comparisonsMade: 1,
    };

    const { result } = renderHook(() => useMergeSort(traits, initialState));

    // Continue the sorting process
    act(() => {
      result.current.matchWin(2); // Pick 2 over 3
    });

    act(() => {
      result.current.matchWin(2); // Pick 2 over 4
    });

    act(() => {
      result.current.matchWin(3); // Pick 3 over 4
    });

    // Wait for state updates to reflect that the sorting is complete
    await waitFor(() => {
      expect(result.current.isComplete).toBe(true);
    });

    // Verify the final standing
    expect(result.current.currentStanding).toEqual([1, 2, 3, 4].slice(0, 7));
  });
  test("should remove items from testing once they are more than 7 items from the top", () => {
    const traits = Array.from({ length: 20 }, (_, i) => i + 1);

    const { result } = renderHook(() => useMergeSort(traits));

    // Simulate user always picking the smallest number to sort in ascending order
    while (!result.current.isComplete) {
      const { currentMatch } = result.current;

      // Always pick the smaller number
      const winner =
        currentMatch.left < currentMatch.right
          ? currentMatch.left
          : currentMatch.right;

      act(() => {
        result.current.matchWin(winner);
      });
    }

    // Ensure only the top 7 items are in the final standing
    expect(result.current.currentStanding.length).toBe(7);
    expect(result.current.currentStanding).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});
