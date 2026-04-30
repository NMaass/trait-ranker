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

    // Snapshot fields after the second match (avoid `{...result.current}` —
    // that captured the live `currentMatch` object, which the third match
    // mutated in-flight under the old buggy implementation).
    const snapshot = {
      currentMatch: { ...result.current.currentMatch },
      comparisonsMade: result.current.comparisonsMade,
      progressPercent: result.current.progressPercent,
    };

    // Third comparison: 3 vs 4, pick 3
    act(() => {
      result.current.matchWin(3);
    });

    // Revert the last match
    act(() => {
      result.current.revertMatch();
    });

    expect(result.current.currentMatch).toEqual(snapshot.currentMatch);
    expect(result.current.comparisonsMade).toEqual(snapshot.comparisonsMade);
    expect(result.current.progressPercent).toEqual(snapshot.progressPercent);
  });

  test("should resume a partially done sort with initialState", async () => {
    const traits = [1, 2, 3, 4];

    // Capture a real mid-sort snapshot from a fresh run so the resume state is
    // structurally consistent with how the hook actually models it.
    const recorder = renderHook(() => useMergeSort(traits));
    act(() => {
      recorder.result.current.matchWin(recorder.result.current.currentMatch.left);
    });
    const snapshot = JSON.parse(
      JSON.stringify(recorder.result.current.rankingState)
    );

    const { result } = renderHook(() => useMergeSort(traits, snapshot));

    // The hydrated state should expose the same currentMatch the recorder saw.
    expect(result.current.currentMatch).toEqual(snapshot.currentMatch);

    // Drive to completion by always picking the larger value (descending).
    while (!result.current.isComplete) {
      const { left, right } = result.current.currentMatch;
      const winner = left > right ? left : right;
      act(() => {
        result.current.matchWin(winner);
      });
    }

    await waitFor(() => {
      expect(result.current.isComplete).toBe(true);
    });

    // Top of the ranking should be the largest items in descending order; we
    // only check that 4 ends up on top since the resume locked in the first
    // comparison's outcome.
    expect(result.current.currentStanding[0]).toBe(4);
  });

  test("should allow reverting the very first comparison", () => {
    const traits = [10, 20, 30, 40];
    const { result } = renderHook(() => useMergeSort(traits));

    const firstMatch = { ...result.current.currentMatch };
    expect(firstMatch).toBeTruthy();

    act(() => {
      result.current.matchWin(firstMatch.left);
    });

    // After one match the currentMatch should have advanced.
    expect(result.current.currentMatch).not.toEqual(firstMatch);

    // Revert — we expect to be back at the very first comparison.
    act(() => {
      result.current.revertMatch();
    });

    expect(result.current.currentMatch).toEqual(firstMatch);
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
