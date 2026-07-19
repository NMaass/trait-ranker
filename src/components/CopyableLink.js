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
        .catch(() => {
          // User dismissed the share sheet — nothing to do.
        });
    } else if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => flashTooltip("Copied!"))
        .catch(() =>
          flashTooltip("Copy failed — long-press the link to copy.")
        );
    } else {
      // No Clipboard API available — surface the link so the user can
      // long-press / triple-click to copy manually.
      flashTooltip("Copy the link below.");
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      wrap="nowrap"
      sx={{ width: "100%", gap: 1 }}
    >
      <Grid item>
        <Tooltip
          title={tooltipMsg}
          open={showTooltip}
          leaveDelay={1500}
          onClose={() => setShowTooltip(false)}
        >
          <Button variant="contained" onClick={onCopy}>
            Share
          </Button>
        </Tooltip>
      </Grid>
      <Grid
        item
        sx={{
          minHeight: "2.5rem",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <InputLabel
          sx={{
            visibility: showLink ? "visible" : "hidden",
            maxWidth: "100%",
            px: 1,
            textAlign: "center",
            whiteSpace: "normal",
            overflowWrap: "anywhere",
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
          }}
        >
          {text}
        </InputLabel>
      </Grid>
    </Grid>
  );
};

export default CopyableLink;
