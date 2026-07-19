import React, { useEffect, useRef, useState } from "react";
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

  // Keep the card DOM node stable between comparisons, but always show a new
  // trait from its front face. This avoids remounting the interactive control
  // (and losing keyboard focus) just to replace its content.
  useEffect(() => {
    setFlipped(false);
  }, [trait]);

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
      // `fade-out` owns opacity while it runs. Every other state explicitly
      // restores opacity so the animation's `forwards` fill cannot leak into
      // the next trait rendered in this persistent card node.
      style={{ opacity: className === "fade-out" ? undefined : 1 }}
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
            sx={{ height: "100%" }}
          >
            <Grid item>
              <h1>{trait}</h1>
            </Grid>
            <Grid item>
              <IconContext.Provider
                value={{
                  style: {
                    width: isMobile
                      ? "min(20vw, 13vh)"
                      : "calc(var(--card-w) * 0.34)",
                    height: isMobile
                      ? "min(20vw, 13vh)"
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
            sx={{ height: "100%" }}
          >
            <Grid item>
              <Typography variant="h6">{traitDefinitions[trait]}</Typography>
            </Grid>
          </Grid>
        </div>
      </div>
      <TouchRipple ref={rippleRef} center={false} />
    </div>
  );
};

export default RankingTrait;
