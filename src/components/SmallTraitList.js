import React from "react";
import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { IconContext } from "react-icons";
import { traitIcons } from "../utils/listOfAllTraits";

const SmallTraitList = ({ traits }) => {
  return (
    <List>
      {traits.slice(0, 7).map((trait) => {
        return (
          <ListItem key={trait}>
            <ListItemAvatar>
              <IconContext.Provider value={{ size: "5vh" }}>
                {traitIcons[trait]}
              </IconContext.Provider>
            </ListItemAvatar>
            <ListItemText>{trait}</ListItemText>
          </ListItem>
        );
      })}
    </List>
  );
};
export default SmallTraitList;
