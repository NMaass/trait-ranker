import React, { useRef, useState } from "react";
import "../../style/CardStyle.scss";
import { traitIcons, traitDefinitions } from "../../utils/listOfAllTraits";
import { IconContext } from "react-icons";
import { Grid, Typography } from "@mui/material";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import CardHelp from "./CardHelp";
import useBreakpoint from "../../utils/useBreakpoint";

const RankingTrait = ({
  trait,
  onClick,
  onAnimationEnd,
  className,
  disabled = false,
}) => {
  const { isMobile } = useBreakpoint();
  const [flipped, setFlipped] = useState(false);
  const rippleRef = useRef(null);

  // Remounted each comparison round (see the `key` in RankingPage), so the
  // card always starts on its front face — no need to flip it back in place.
  const onRippleStart = (event) => {
    if (!disabled) rippleRef.current?.start(event);
  };
  const onRippleStop = (event) => {
    rippleRef.current?.stop(event);
  };

  const toggleFlipped = (event) => {
    setFlipped((current) => !current);
    event.stopPropagation();
  };

  const activate = () => {
    if (!disabled) onClick();
  };

  const handleKeyDown = (event) => {
    if (disabled || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    activate();
  };

  return (
    <div
      className={`card rankCard ${flipped ? "flipped" : ""} ${className || ""}`}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-label={`Choose ${trait}`}
      onClick={activate}
      onKeyDown={handleKeyDown}
      onAnimationEnd={onAnimationEnd}
      onMouseDown={onRippleStart}
      onMouseUp={onRippleStop}
      onMouseLeave={onRippleStop}
    >
      <div className="card-inner">
        <div className="card-front">
          <CardHelp toggleFlipped={toggleFlipped} icon="help" />
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
            // Mobile ranking cards are short landscape slabs; the default
            // wrap let a tall name+icon spill into a second "column", which
            // shoved the icon to the card's right edge. Never wrap.
            wrap="nowrap"
            sx={{ height: "100%" }}
          >
            <Grid item sx={{ minHeight: 0 }}>
              <Typography
                component="h1"
                align="center"
                sx={{
                  fontWeight: 600,
                  lineHeight: 1.2,
                  // Scale with the card so long trait names stay inside.
                  fontSize: isMobile ? "clamp(1.1rem, 6vw, 1.6rem)" : "2rem",
                  m: 0,
                }}
              >
                {trait}
              </Typography>
            </Grid>
            <Grid item sx={{ minHeight: 0, display: "flex" }}>
              <IconContext.Provider
                value={{
                  style: {
                    width: isMobile
                      ? "min(16vw, 11vh)"
                      : "calc(var(--card-w) * 0.34)",
                    height: isMobile
                      ? "min(16vw, 11vh)"
                      : "calc(var(--card-w) * 0.34)",
                  },
                }}
              >
                {traitIcons[trait]}
              </IconContext.Provider>
            </Grid>
          </Grid>
        </div>
        <div className="card-back">
          <CardHelp toggleFlipped={toggleFlipped} icon="flip" />
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
            wrap="nowrap"
            sx={{ height: "100%" }}
          >
            <Grid item sx={{ minHeight: 0 }}>
              <Typography
                variant={isMobile ? "body2" : "h6"}
                align="center"
                sx={{ px: 1 }}
              >
                {traitDefinitions[trait]}
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
      <TouchRipple ref={rippleRef} center={false} />
    </div>
  );
};

export default RankingTrait;
