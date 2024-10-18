import React, { useState, useEffect } from "react";
import "../../style/CardStyle.scss";
import { traitIcons, traitDefinitions } from "../../utils/listOfAllTraits";
import { IconContext } from "react-icons";
import { useMediaQuery, Grid, Typography } from "@mui/material";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import CardHelp from "./CardHelp";

const RankingTrait = ({ trait, onClick, className }) => {
  const isMobile = useMediaQuery("(max-width:1024px)");
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
      onMouseDown={onRippleStart}
      onMouseUp={onRippleStop}
    >
      <div className="card-inner">
        {/* Front Side */}
        <div className="card-front">
          <CardHelp toggleFlipped={toggleFlipped} flipped={flipped} />
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Grid item>
              <h1>{trait}</h1>
            </Grid>
            <Grid item>
              <IconContext.Provider
                value={isMobile ? { size: "30vw" } : { size: "6vw" }}
              >
                {traitIcons[trait]}
              </IconContext.Provider>
            </Grid>
          </Grid>
        </div>
        {/* Back Side */}
        <div className="card-back">
          <CardHelp toggleFlipped={toggleFlipped} flipped={flipped} />
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Grid item>
              <h1>{trait}</h1>
            </Grid>
            <Grid item>
              <Typography variant="h5">{traitDefinitions[trait]}</Typography>
            </Grid>
          </Grid>
        </div>
      </div>
      <TouchRipple ref={rippleRef} center={false} />
    </div>
  );
};

export default RankingTrait;
