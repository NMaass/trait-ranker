// jsdom doesn't implement matchMedia, which useBreakpoint (and thus the
// Select/Rank pages) read at render time. Provide a minimal inert polyfill so
// components mount in tests without throwing — values mirror a "no match"
// environment, which the hooks already treat as their non-desktop branch.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
});