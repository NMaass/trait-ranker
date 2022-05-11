import React, {useEffect} from "react";
import {traitIcons} from "../Assets/listOfAllTraits";
import {List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {IconContext} from "react-icons";

const Results = ({topTraits, setTopTraits, fetchTopTraits}) => {

    useEffect(()=>{
        setTopTraits(fetchTopTraits)
    },[fetchTopTraits, setTopTraits])
    return(
        <div>
            <h3>
                Top Ten
            </h3>
            <List>
                {topTraits.reverse().splice(0,10).map((trait) =>{
                 return(
                     <ListItem key={trait}>
                         <ListItemAvatar>
                             <IconContext.Provider value={{size: '6vw'}}>
                                 {traitIcons[trait]}
                             </IconContext.Provider>
                         </ListItemAvatar>
                         <ListItemText>
                             {trait}
                         </ListItemText>
                     </ListItem>
                 )
                })}
            </List>
        </div>)
};

export default Results;
