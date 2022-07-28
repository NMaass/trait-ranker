import React, { useState } from "react";
import { Button, Grid, InputLabel, Tooltip } from "@mui/material";
import {trackShare} from "../utils/mixpanel"

const CopyableLink = ({ text }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showLink, setShowLink] = useState(false);
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
    } else {
      navigator.clipboard
        .writeText(text)
        .then(() => console.log("Copied!"))
        .catch(() => console.log("Copy failed"));
      setShowTooltip(true);
      setShowLink(true);
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
          title={"Copied to clipboard!"}
          open={showTooltip}
          leaveDelay={1000}
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
