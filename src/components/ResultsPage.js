import React, {useEffect, useRef} from "react";
import {traitIcons} from "../utils/listOfAllTraits";
import {List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {IconContext} from "react-icons";
import makeId from "../utils/makeIdUtil"
import CopyableLink from "./CopyableLink";
import {getHash, setDBTraits} from "../utils/Firebase";
import SmallTraitList from "./SmallTraitList";


const ResultsPage = ({topTraits, setTopTraits, fetchTopTraits}) => {
    let hash = useRef(makeId(6));
    useEffect(()=>{
        setDBTraits(hash.current, topTraits.reverse().splice(0, 7)).catch((e)=>{
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
            <SmallTraitList traits={topTraits.reverse()}/>
            <CopyableLink text={"localhost:3000/trait-ranker/Share/" +hash.current}/>
        </div>)
};

export default ResultsPage;
