import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

// Asked once on app load when localStorage holds an in-progress session, so the
// user is in control of whether to pick up where they left off vs start fresh.
const ResumePrompt = ({ open, stage, onResume, onStartOver }) => {
  const stageLabel =
    stage === "ranking"
      ? "ranking your traits"
      : stage === "results"
      ? "viewing your results"
      : "selecting traits";
  return (
    <Dialog
      open={open}
      onClose={onResume}
      aria-labelledby="resume-prompt-title"
      aria-describedby="resume-prompt-body"
    >
      <DialogTitle id="resume-prompt-title">Welcome back</DialogTitle>
      <DialogContent>
        <DialogContentText id="resume-prompt-body">
          You were in the middle of {stageLabel}. Pick up where you left off, or
          start over?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onStartOver} color="warning">
          Start over
        </Button>
        <Button onClick={onResume} variant="contained" autoFocus>
          Resume
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResumePrompt;
