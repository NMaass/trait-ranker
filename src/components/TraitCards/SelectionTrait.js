// SelectionTrait.jsx

import React, { useState } from "react";
import "../../style/CardStyle.scss";
import { traitIcons, traitDefinitions } from "../../utils/listOfAllTraits";
import { IconContext } from "react-icons";
import { useMediaQuery, Grid, Typography } from "@mui/material";
import CardHelp from "./CardHelp";

const SelectionTrait = ({ trait, firstCard, provided }) => {
  const isMobile = useMediaQuery("(max-width:1024px)");
  const [flipped, setFlipped] = useState(false);

  const toggleFlipped = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      className={`card selection ${flipped ? "flipped" : ""}`}
      {...provided.dragHandleProps}
      draggable={true}
      id={trait}
    >
      <div className=" card-inner">
        {/* Front Side */}
        <div className="card-front">
          <CardHelp
            toggleFlipped={toggleFlipped}
            flipped={flipped}
            firstCard={firstCard}
          />
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
                value={isMobile ? { size: "60vw" } : { size: "6vw" }}
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
    </div>
  );
};

export default SelectionTrait;
