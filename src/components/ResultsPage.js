import React, {useEffect, useRef} from "react";
import {traitIcons} from "../utils/listOfAllTraits";
import {List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {IconContext} from "react-icons";
import makeId from "../utils/makeIdUtil"
import CopyableLink from "./CopyableLink";
import {getHash, setTraits} from "../utils/Firebase";


const ResultsPage = ({topTraits, setTopTraits, fetchTopTraits}) => {
    let hash = useRef(makeId(4));
    useEffect(()=>{
        setTraits(hash.current, topTraits.reverse().splice(0, 7)).catch((e)=>{
            console.log(e)
        });
        console.log(hash.current)
    },[topTraits])

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
            <CopyableLink text={"localhost:3000/trait-ranker/Share/" +hash.current}/>
        </div>)
};

export default ResultsPage;
