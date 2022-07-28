import React from "react";
import "../../style/CardStyle.scss";
import { traitIcons } from "../../utils/listOfAllTraits";
import { IconContext } from "react-icons";
import { useMediaQuery, Grid } from "@mui/material";

const SelectionTrait = ({ trait, provided }) => {
  const isMobile = useMediaQuery("(min-width:1024px");

  return (
    <div
      className="card selection"
      {...provided.dragHandleProps}
      draggable={true}
      id={trait}
    >
      <Grid container
            alignItems='center'
            justifyContent='center'
            dirction='column'>
        <Grid item>
          <h1>{trait}</h1>
        </Grid>
      <Grid item>
      <IconContext.Provider
        value={isMobile ? { size: "6vw" } : { size: "60vw" }}
      >
        {traitIcons[trait]}
      </IconContext.Provider>
      </Grid>
      </Grid>
    </div>
  );
};
export default SelectionTrait;
