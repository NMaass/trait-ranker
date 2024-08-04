import React, { useState } from "react";
import "../../style/CardStyle.scss";
import { traitIcons } from "../../utils/listOfAllTraits";
import { IconContext } from "react-icons";
import { useMediaQuery, Grid } from "@mui/material";
import CardHelp from "./CardHelp";

const SelectionTrait = ({ trait, provided }) => {
  const isMobile = useMediaQuery("(min-width:1024px)");
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
          {flipped ? (
            <>
              <p>Lorem ipsum dolor sit amet.</p>
              <p>Consectetur adipiscing elit sed.</p>
            </>
          ) : (
            <IconContext.Provider
              value={isMobile ? { size: "6vw" } : { size: "60vw" }}
            >
              {traitIcons[trait]}
            </IconContext.Provider>
          )}
        </Grid>
      </Grid>
    </div>
  );
};
export default SelectionTrait;
