import React from "react";
import "../../style/CardStyle.scss";
import { traitIcons } from "../../utils/listOfAllTraits";
import { IconContext } from "react-icons";
import { useMediaQuery, Grid } from "@mui/material";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";

const RankingTrait = ({ trait, onClick }) => {
  const isMobile = useMediaQuery("(min-width:1024px");

  const rippleRef = React.useRef(null);
  const onRippleStart = (e) => {
    rippleRef.current.start(e);
  };
  const onRippleStop = (e) => {
    rippleRef.current.stop(e);
  };

  return (
    <div
      className="card rankCard"
      onClick={onClick}
      onMouseDown={onRippleStart}
      onMouseUp={onRippleStop}
    >
      <Grid container
            alignItems='center'
            justifyContent='center'
            direction="column">
        <Grid item>
      <h1>{trait}</h1>
        </Grid>
        <Grid item>


      <IconContext.Provider
        value={isMobile ? { size: "6vw" } : { size: "20vw" }}
      >
        {traitIcons[trait]}
      </IconContext.Provider>
        </Grid>
      </Grid>
      <TouchRipple ref={rippleRef} center={false} />
    </div>
  );
};

export default RankingTrait;
