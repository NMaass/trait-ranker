// useMergeSort.test.js
import { renderHook, act } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";
import useMergeSort from "../utils/useMergeSort";

describe("useMergeSort Hook", () => {
  test("initializes correctly with multiple traits", () => {
    const traits = ["Trait A", "Trait B", "Trait C", "Trait D"];

    const { result } = renderHook(() => useMergeSort(traits));

    expect(result.current.isComplete).toBe(false);
    expect(result.current.currentStanding).toEqual([]);
    expect(result.current.progressPercent).toBe(0);
    expect(result.current.currentMatch).toBeDefined();
    expect(result.current.currentMatch.left).toBeDefined();
    expect(result.current.currentMatch.right).toBeDefined();
  });

  test("progresses through matches and completes sorting", async () => {
    const traits = ["A", "B", "C", "D"];
    const { result } = renderHook(() => useMergeSort(traits));

    // First comparison: 'A' vs 'B'
    act(() => {
      result.current.matchWin("A");
    });

    // Wait for state update
    await waitFor(() => expect(result.current.currentMatch).not.toBeNull());

    // Second comparison: 'C' vs 'D'
    act(() => {
      result.current.matchWin("C");
    });

    await waitFor(() => expect(result.current.currentMatch).not.toBeNull());

    // Third comparison: 'A' vs 'C'
    act(() => {
      result.current.matchWin("A");
    });

    await waitFor(() => expect(result.current.currentMatch).not.toBeNull());

    // Fourth comparison: 'B' vs 'C'
    act(() => {
      result.current.matchWin("C");
    });

    await waitFor(() => expect(result.current.currentMatch).not.toBeNull());

    // Fifth comparison: 'B' vs 'D'
    act(() => {
      result.current.matchWin("D");
    });

    // Wait until sorting is complete
    await waitFor(() => expect(result.current.isComplete).toBe(true));

    expect(result.current.currentStanding).toEqual(["A", "C", "D", "B"]);
    expect(result.current.progressPercent).toBe(100);
  });
  test("handles odd number of traits", async () => {
    const traits = ["A", "B", "C"];
    const { result } = renderHook(() => useMergeSort(traits));

    // First comparison: 'A' vs 'B'
    act(() => {
      result.current.matchWin("A");
    });

    await waitFor(() => expect(result.current.currentMatch).not.toBeNull());

    // Second comparison: 'A' vs 'C'
    act(() => {
      result.current.matchWin("A");
    });

    await waitFor(() => expect(result.current.currentMatch).not.toBeNull());

    // Third comparison: 'B' vs 'C'
    act(() => {
      result.current.matchWin("C");
    });

    // Wait until sorting is complete
    await waitFor(() => expect(result.current.isComplete).toBe(true));

    expect(result.current.currentStanding).toEqual(["A", "C", "B"]);
    expect(result.current.progressPercent).toBe(100);
  });

  test("revertMatch function reverts the last match", async () => {
    const traits = ["A", "B", "C", "D"];
    const { result } = renderHook(() => useMergeSort(traits));

    // First comparison
    act(() => {
      result.current.matchWin("B");
    });

    await waitFor(() => expect(result.current.currentMatch).not.toBeNull());

    // Second comparison
    act(() => {
      result.current.matchWin("D");
    });

    await waitFor(() => expect(result.current.currentMatch).not.toBeNull());

    // Third comparison
    act(() => {
      result.current.matchWin("B");
    });

    await waitFor(() => expect(result.current.currentMatch).not.toBeNull());

    // Revert last match
    act(() => {
      result.current.revertMatch();
    });

    await waitFor(() => expect(result.current.isComplete).toBe(false));

    expect(result.current.currentMatch).toEqual({ left: "B", right: "D" });
    expect(result.current.progressPercent).toBeLessThan(100);

    // Proceed again with a different choice
    act(() => {
      result.current.matchWin("D");
    });

    await waitFor(() => expect(result.current.currentMatch).not.toBeNull());

    // Additional comparisons to complete sorting
    act(() => {
      result.current.matchWin("D");
    });

    await waitFor(() => expect(result.current.currentMatch).not.toBeNull());

    act(() => {
      result.current.matchWin("C");
    });

    await waitFor(() => expect(result.current.isComplete).toBe(true));

    expect(result.current.currentStanding).toEqual(["D", "B", "C", "A"]);
  });

  test("handles immediate completion with one trait", () => {
    const traits = ["A"];
    const { result } = renderHook(() => useMergeSort(traits));

    expect(result.current.isComplete).toBe(true);
    expect(result.current.currentStanding).toEqual(["A"]);
    expect(result.current.progressPercent).toBe(100);
    expect(result.current.currentMatch).toBeNull();
  });

  test("does not crash with empty traits array", () => {
    const traits = [];
    const { result } = renderHook(() => useMergeSort(traits));

    expect(result.current.isComplete).toBe(true);
    expect(result.current.currentStanding).toEqual([]);
    expect(result.current.progressPercent).toBe(100);
    expect(result.current.currentMatch).toBeNull();
  });
});
