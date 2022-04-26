import React from "react";
import {traitIcons} from "../Assets/listOfAllTraits";
import {List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";

const Results = ({topTraits}) => {

    return(
        <div>
            <h3>
                Top Ten
            </h3>
            <List>
                {topTraits.map((trait) =>{
                 return(
                     <ListItem>
                         <ListItemAvatar>
                             {traitIcons[trait]}
                         </ListItemAvatar>
                         <ListItemText>
                             {trait}
                         </ListItemText>
                     </ListItem>
                 )
                })}
            </List>
            <div style={{display:'flex'}}>
                <p>
                    Lorem ipsum dolar sit amet
                </p>
            </div>

        </div>)
};

export default Results;
