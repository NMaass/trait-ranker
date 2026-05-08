import { createTheme } from "@mui/material";

// Single source of truth for color. Components should pull from
// `theme.palette` (or `theme.palette.custom` for app-specific tokens) rather
// than hard-coding hex values or CSS keyword colors.
const tokens = {
  // Brand
  primary: "#0096c7", // Mid teal — AppBar, primary buttons, focus
  primaryDark: "#0077b6", // Hover / pressed
  primarySurface: "#caf0f9", // The original pastel — now a surface tint
  secondary: "#90e0ef", // Pastel teal — active stepper, accents on dark
  secondaryDark: "#003a52", // Icon contrast inside pastel chips

  // Neutrals
  bg: "#ffffff",
  surface: "#ffffff",
  surfaceMuted: "#f3f4f6",
  textPrimary: "#1f2937",
  textSecondary: "#6b7280",
  divider: "#e5e7eb",

  // Semantic
  warning: "#d97757", // Desaturated coral — destructive but not alarming

  // Drop targets in the swipe interface. Soft pastels that match the rest of
  // the palette; semantics stay locked (left = reject, right = accept) and
  // the restart phase uses the cream tier for "loved".
  dropReject: "#fbe2e2", // Rose
  dropAccept: "#dff7e3", // Mint
  dropLove: "#fef3c7", // Cream
};

const appTheme = createTheme({
  palette: {
    primary: {
      main: tokens.primary,
      dark: tokens.primaryDark,
      light: tokens.primarySurface,
      contrastText: "#ffffff",
    },
    secondary: {
      main: tokens.secondary,
      contrastText: tokens.secondaryDark,
    },
    warning: {
      main: tokens.warning,
      contrastText: "#ffffff",
    },
    background: {
      default: tokens.bg,
      paper: tokens.surface,
    },
    text: {
      primary: tokens.textPrimary,
      secondary: tokens.textSecondary,
    },
    divider: tokens.divider,
    // App-specific tokens. Read with `theme.palette.custom.*`.
    custom: {
      surfaceMuted: tokens.surfaceMuted,
      dropReject: tokens.dropReject,
      dropAccept: tokens.dropAccept,
      dropLove: tokens.dropLove,
    },
  },
});

export default appTheme;
