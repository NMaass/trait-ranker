import { createTheme } from "@mui/material";

// Single source of truth for color. Components should pull from
// `theme.palette` (or `theme.palette.custom` for app-specific tokens) rather
// than hard-coding hex values or CSS keyword colors.
// Shared pastel: the brand surface tint doubles as the "accept" drop tier so
// every positive surface in the app is literally the same color.
const softTeal = "#caf0f9";

const tokens = {
  // Brand
  primary: "#0096c7", // Mid teal — AppBar, primary buttons, focus
  primaryDark: "#0077b6", // Hover / pressed
  primarySurface: softTeal, // The original pastel — now a surface tint
  secondary: "#90e0ef", // Pastel teal — active stepper, accents on dark
  secondaryDark: "#003a52", // Icon contrast inside pastel chips

  // Neutrals
  bg: "#f0f4f8", // Soft cool gray — gives white cards visible elevation
  surface: "#ffffff",
  surfaceMuted: "#f3f4f6",
  textPrimary: "#1f2937",
  textSecondary: "#6b7280",
  divider: "#e5e7eb",

  // Semantic
  warning: "#d97757", // Desaturated coral — destructive but not alarming

  // Drop targets in the swipe interface. Semantics stay locked (left =
  // reject, right = accept) and the restart phase uses the cream tier for
  // "loved". Color theory: the accept tier sits in the brand teal family so
  // every positive action reads as "brand", and the reject/accept pair is a
  // warm/cool opposition (rose vs teal) rather than red vs green — legible
  // to red-green colorblind users and calmer overall.
  dropReject: "#fbe2e2", // Soft rose
  dropAccept: softTeal, // Soft brand teal — same token as primarySurface
  dropLove: "#fef3c7", // Soft cream

  // Icon/ink colors that sit on top of the pastel drop colors above —
  // darker takes of the same hue, ≥4.5:1 on their pastel, so action
  // buttons stay readable.
  inkReject: "#a8403a",
  inkAccept: "#00587e",
  inkLove: "#a14d08",
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
      inkReject: tokens.inkReject,
      inkAccept: tokens.inkAccept,
      inkLove: tokens.inkLove,
    },
  },
});

export default appTheme;
