import React, { useState } from "react";
import "../../style/CardStyle.scss";
import { traitIcons, traitDefinitions } from "../../utils/listOfAllTraits";
import { IconContext } from "react-icons";
import { Grid, Typography } from "@mui/material";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import CardHelp from "./CardHelp";
import useBreakpoint from "../../utils/useBreakpoint";

const RankingTrait = ({ trait, onClick, onAnimationEnd, className }) => {
  const { isMobile } = useBreakpoint();
  const [flipped, setFlipped] = useState(false);

  const rippleRef = React.useRef(null);
  const onRippleStart = (e) => {
    rippleRef.current.start(e);
  };
  const onRippleStop = (e) => {
    rippleRef.current.stop(e);
  };

  const toggleFlipped = (e) => {
    setFlipped(!flipped);
    e.stopPropagation(); // Prevent the onClick from triggering
  };

  return (
    <div
      className={`card rankCard ${flipped ? "flipped" : ""} ${className || ""}`}
      onClick={onClick}
      onAnimationEnd={onAnimationEnd}
      onMouseDown={onRippleStart}
      onMouseUp={onRippleStop}
    >
      <div className="card-inner">
        {/* Front Side */}
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
                // Mobile ranking cards are landscape, so size against the
                // shorter edge; desktop cards scale with --card-w.
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
        {/* Back Side — definition only; the trait name stays on the front. */}
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
