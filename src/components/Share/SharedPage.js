import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getDBTraits} from "../../utils/Firebase";
import {Grid} from "@mui/material";
import RankingTrait from "../TraitCards/RankingTrait";
import SmallTraitList from "../SmallTraitList";
import GuessPage from "./GuessPage";

const SharedPage = ({columnData, setColumnData}) => {
    let {id}= useParams();
    const [storedTraits,setStoredTraits] = useState([]);
    const [showList, setShowList] = useState(false);
    const [showGuessing, setShowGuessing] = useState(false);
    const [showOptions, setShowOptions] = useState(true);
    useEffect(()=>{
        (async () => {
            await getDBTraits(id)
                .then(result => {
                    setStoredTraits(result)
                })
        })()
    },[id])
    const showTraits = () =>{
       setShowList(true);
       setShowOptions(false);
    }
    const showGuess = () =>{
        setShowGuessing(true);
        setShowOptions(false)
    }
    console.log("storedTraits", storedTraits)
    return(
        <Grid
            container
            direction='row'
            spacking={60}>
            {showOptions &&
            <Grid item>
                <RankingTrait onClick={showTraits} trait="Show the traits"/>
            </Grid> }
            {showOptions &&
            <Grid item>
                <RankingTrait onClick={showGuess} trait="Guess the traits"/>
            </Grid> }
            {showList &&
            <Grid item>
                <SmallTraitList traits={storedTraits}/>
            </Grid>}
            {showGuessing &&
            <Grid item>
                <GuessPage traits={storedTraits} columnData={columnData} setColumnData={setColumnData}/>
            </Grid>}
        </Grid>
    )
}
export default SharedPage
