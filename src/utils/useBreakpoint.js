import { useMediaQuery } from "@mui/material";

// Centralized media-query hook so we don't have inverted-named flags
// (`isMobile = useMediaQuery("(min-width:1024px)")`) scattered through the
// codebase. Returns both names so consumers can pick whichever reads naturally.
export default function useBreakpoint() {
  const isDesktop = useMediaQuery("(min-width:1024px)");
  return { isDesktop, isMobile: !isDesktop };
}
