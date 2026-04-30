import React, { useState } from "react";
import { Button, Grid, InputLabel, Tooltip } from "@mui/material";
import { trackShare } from "../utils/mixpanel";

const CopyableLink = ({ text }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [tooltipMsg, setTooltipMsg] = useState("Copied to clipboard!");

  const flashTooltip = (message) => {
    setTooltipMsg(message);
    setShowTooltip(true);
    setShowLink(true);
  };

  const onCopy = () => {
    trackShare();
    if (navigator.share) {
      navigator
        .share({
          text: "Take a look at my most valued traits",
          url: text,
        })
        .then(() => console.log("successful share"))
        .catch((error) => console.log("error sharing", error));
    } else if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => flashTooltip("Copied!"))
        .catch(() => flashTooltip("Copy failed — long-press the link to copy."));
    } else {
      // No Clipboard API available — surface the link so the user can
      // long-press / triple-click to copy manually.
      flashTooltip("Copy the link below.");
    }
  };
  const onTipClose = () => {
    setShowTooltip(false);
  };
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <Grid item>
        <Tooltip
          title={tooltipMsg}
          open={showTooltip}
          leaveDelay={1500}
          onClose={onTipClose}
        >
          <Button variant="contained" onClick={onCopy}>
            Share
          </Button>
        </Tooltip>
      </Grid>
      {showLink && (
        <Grid item>
          <InputLabel>{text}</InputLabel>
        </Grid>
      )}
    </Grid>
  );
};
export default CopyableLink;
