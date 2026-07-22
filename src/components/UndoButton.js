import React, { useContext } from "react";
import { IconButton } from "@mui/material";
import { FaUndo } from "react-icons/fa";
import { UndoContext } from "./App";

// Shared undo trigger. Rendered at the bottom of the Select/Rank screens
// (not the app bar) so it sits with the actions it undoes. Calls through
// the ref at click time — the active page assigns the real handler in a
// later effect, so binding `undoFunction.current` at render would go stale.
const UndoButton = ({ label = "Undo last action", sx }) => {
  const { undoFunction } = useContext(UndoContext);
  return (
    <IconButton
      onClick={() => undoFunction.current?.()}
      aria-label={label}
      sx={{
        pointerEvents: "auto",
        width: 44,
        height: 44,
        bgcolor: "background.paper",
        color: "text.secondary",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05), 0 6px 16px rgba(0,0,0,0.1)",
        "&:hover": { bgcolor: "grey.100" },
        ...sx,
      }}
    >
      <FaUndo size="0.85em" />
    </IconButton>
  );
};

export default UndoButton;
