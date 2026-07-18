// Single source of truth for the app's coaching/guidance line style, so the
// Selection swipe hint (FadeTextSeries) and the Ranking prompt read identically
// and stay pinned in the same spot below the app bar.
//
// Absolutely positioned (out of flow) so it never pushes the cards; z-index
// keeps it above the cards (.card is z-index:1).
export const coachingTextSx = {
  minHeight: "1.9rem",
  position: "absolute",
  top: "calc(64px + 1.5rem)",
  left: 0,
  width: "100%",
  zIndex: 3,
  color: "text.secondary",
  fontWeight: 500,
};
