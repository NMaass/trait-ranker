import React, {useEffect} from "react";
import {traitIcons} from "../utils/listOfAllTraits";
import {List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {IconContext} from "react-icons";
import makeId from "../utils/makeIdUtil"
import CopyableLink from "./CopyableLink";


const ResultsPage = ({topTraits, setTopTraits, fetchTopTraits}) => {


    useEffect(()=>{
        if(topTraits.length === 0){
            setTopTraits(fetchTopTraits)
        }
    },[])
    return(
        <div>
            <h3>
                Top Traits
            </h3>
            <List>
                {topTraits.reverse().splice(0,7).map((trait) =>{
                    return(
                        <ListItem key={trait}>
                            <ListItemAvatar>
                                <IconContext.Provider value={{size: '5vh'}}>
                                    {traitIcons[trait]}
                                </IconContext.Provider>
                            </ListItemAvatar>
                            <ListItemText >
                                {trait}
                            </ListItemText>
                        </ListItem>
                    )
                })}
            </List>
            <CopyableLink text={"localhost:3000/trait-ranker/" +makeId(4)}/>
        </div>)
};

export default ResultsPage;
