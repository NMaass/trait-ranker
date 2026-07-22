import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import RankingPage from "../components/RankingPage";
import { ProgressContext, UndoContext } from "../components/App";

// jsdom doesn't run CSS animations, so the slide-out / slide-in `animationend`
// events never fire — the page's timer fallback (ANIM_FALLBACK_MS ≈ 950ms) is
// what advances the state machine in a test environment. We drive it with
// fake timers so the round trips are deterministic and fast.

// jsdom doesn't run CSS animations, so the slide-out / slide-in `animationend`
// events never fire on their own. The RankingPage state machine has a timer
// fallback, but firing the events directly drives the real code path and keeps
// the test deterministic and fast.

// Advance past the ANIM_FALLBACK_MS safety window so the fallback timer fires
// the next phase transition exactly as it would if a real `animationend` were
// missed (which is jsdom's default).
const ANIM_FALLBACK_MS = 950;
const settle = (ms = ANIM_FALLBACK_MS + 50) => {
  act(() => {
    jest.advanceTimersByTime(ms);
  });
};

const traits = [
  "Artistry",
  "Musicality",
  "Leadership",
  "Excellence",
  "Patience",
  "Generosity",
  "Boldness",
  "Caution",
  "Empathy",
];

const makeProviders = (undoRef) => ({
  progressContext: { progress: [0, jest.fn()], activeStep: [0, jest.fn()] },
  undoContext: { undoFunction: undoRef },
});

const renderRanking = (props = {}) => {
  const undoRef = { current: null };
  const history = { push: jest.fn(), replace: jest.fn() };
  const setTopTraits = jest.fn();
  const setProgressData = jest.fn();
  const providers = makeProviders(undoRef);
  const utils = render(
    <ProgressContext.Provider value={providers.progressContext}>
      <UndoContext.Provider value={providers.undoContext}>
        <RankingPage
          topTraits={traits.slice()}
          setTopTraits={setTopTraits}
          history={history}
          initalProgress={null}
          setProgressData={setProgressData}
          progressData={null}
          {...props}
        />
      </UndoContext.Provider>
    </ProgressContext.Provider>
  );
  return { ...utils, history, setTopTraits, setProgressData, undoRef };
};

const cards = (container) =>
  Array.from(container.querySelectorAll(".rankCard"));

// Drive a full out → in round as a user sees it: click the given card, let it
// slide out (fallback timer), let the next pair slide in (fallback timer).
// Returns the card elements present before and after the round.
const playRound = (container, pickIndex = 0) => {
  const before = cards(container);
  act(() => {
    fireEvent.click(before[pickIndex]);
  });
  // The winning card should have been animating out; the fallback fires
  // finishSlideOut, which commits the merge and remounts the next pair.
  settle();
  const after = cards(container);
  // The slide-in fallback then resolves the round back to idle.
  settle();
  return { before, after };
};

describe("RankingPage", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  test("renders the first comparison pair from the trait list", () => {
    const { container } = renderRanking();
    const cs = cards(container);
    expect(cs.length).toBe(2);
    // aria-label is `Choose <trait>` — the two displayed traits are a real pair.
    const labels = cs.map((c) => c.getAttribute("aria-label"));
    expect(labels.every((l) => l.startsWith("Choose "))).toBe(true);
  });

  test("remounts the cards each round so a losing card never keeps fade-out", () => {
    const { container } = renderRanking();
    const { before, after } = playRound(container, 0);

    // Regression guard for the fade-leak bug: the cards are REMOUNTED per
    // round (new DOM nodes), so a `fade-out` forwards-fill can never cling to
    // a trait that slides back in. A reused node would be the same element.
    expect(after[0]).not.toBe(before[0]);
    expect(after[1]).not.toBe(before[1]);

    // After the round settles, neither card carries a slide/fade class.
    cards(container).forEach((c) => {
      expect(c.className).not.toMatch(/fade|slide/);
    });
  });

  test("advances the comparison on each pick and reaches Results", () => {
    const { container, history } = renderRanking();
    let guard = 0;
    while (history.push.mock.calls.length === 0 && guard < 2000) {
      playRound(container, 0);
      guard++;
    }
    expect(history.push).toHaveBeenCalledWith("/Results");
  });

  test("undo restores the previous comparison", () => {
    const { container, undoRef } = renderRanking();
    const firstPair = cards(container).map((c) =>
      c.getAttribute("aria-label")
    );

    const { after } = playRound(container, 0);
    const afterPair = after.map((c) => c.getAttribute("aria-label"));
    expect(afterPair).not.toEqual(firstPair);

    // Undo via the handler the page registered on the shared ref.
    expect(undoRef.current).toBeInstanceOf(Function);
    act(() => {
      undoRef.current();
    });
    // Let the undo slide-in play out so the round returns to idle.
    settle();

    const restoredPair = cards(container).map((c) =>
      c.getAttribute("aria-label")
    );
    expect(restoredPair).toEqual(firstPair);
  });

  test("ignores clicks while an animation is in flight", () => {
    const { container, history } = renderRanking();
    const first = cards(container)[0];
    act(() => {
      fireEvent.click(first); // phase -> "out"
    });
    // A second click during "out" must not corrupt the merge — guarded by phase.
    act(() => {
      fireEvent.click(first);
    });
    // Still on the same pair until the slide-out fallback completes.
    const still = cards(container).map((c) => c.getAttribute("aria-label"));
    expect(still).toEqual([
      first.getAttribute("aria-label"),
      expect.any(String),
    ]);
    // Finish the round so no timers leak into the next test.
    settle();
    settle();
  });
});