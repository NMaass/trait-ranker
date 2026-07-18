// SelectionTrait.js

import React, { useState } from "react";
import "../../style/CardStyle.scss";
import { traitIcons, traitDefinitions } from "../../utils/listOfAllTraits";
import { IconContext } from "react-icons";
import { Grid, Typography } from "@mui/material";
import CardHelp from "./CardHelp";

const SelectionTrait = ({ trait, firstCard, provided }) => {
  const [flipped, setFlipped] = useState(false);

  const toggleFlipped = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      className={`card selection ${flipped ? "flipped" : ""}`}
      {...provided.dragHandleProps}
      id={trait}
    >
      <div className=" card-inner">
        {/* Front Side */}
        <div className="card-front">
          <CardHelp
            toggleFlipped={toggleFlipped}
            icon="help"
            firstCard={firstCard}
          />
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
                // Size relative to the card (via --card-w) so the icon keeps
                // its proportion at any viewport instead of overflowing.
                value={{
                  style: {
                    width: "calc(var(--card-w) * 0.4)",
                    height: "calc(var(--card-w) * 0.4)",
                  },
                }}
              >
                {traitIcons[trait]}
              </IconContext.Provider>
            </Grid>
          </Grid>
        </div>
        {/* Back Side */}
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
              <h1>{trait}</h1>
            </Grid>
            <Grid item>
              <Typography variant="h5">{traitDefinitions[trait]}</Typography>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default SelectionTrait;
