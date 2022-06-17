import React, {useEffect, useRef, useState} from 'react';
import {Grid, useMediaQuery} from "@mui/material";
import RankingTrait from "../TraitCards/RankingTrait";
import initialTraits from "../Selection/initialTraits";
import shuffle from "../../utils/ShuffleUtil";
import ReorderableColumn from "./ReorderableColumn";
import ReorderGuess from "./ReorderGuess";

const GuessPage = ({traits, columnData, setColumnData}) => {
    let traitsLeft = useRef(shuffle(traits.splice(0,7)))
    let wrongTraits = useRef([])
    let traitPool = initialTraits.columns.column2.traitIds//already randomized on each load
    let finalList = useRef([])

    const [currentTraits, setCurrentTraits] = useState([])
    const [showPicks, setShowPicks] = useState(true)
    const [showColumn, setShowColumn] = useState(false)

    useEffect(()=>{
        while(wrongTraits.current.length < 7){ //get eligible red herrings
            if (!traitsLeft.current.includes(traitPool[0]))
            {
                wrongTraits.current.push(traitPool[0]);
            }
            traitPool = traitPool.splice(1,traitPool.length);
        }
       loadNextTraits();
    },[traitPool])

    const handlePick = (pick) => {
        finalList.current.push(pick)
        if(traitsLeft.current.length === 0){
            const newTraits = {
                ...columnData.columns.guessing,
                traitIds:finalList.current,
            }
            const newColumnData = {
                ...columnData,
                columns:{
                    ...columnData.columns,
                    guessing: newTraits,
                },
            }
            setColumnData(newColumnData)

            setShowColumn(true)
            setShowPicks(false)
        }
        loadNextTraits()
    }
    const loadNextTraits = () => {
        setCurrentTraits(shuffle([traitsLeft.current.pop(), wrongTraits.current.pop()]))
        console.log("TraitsLeft: ", traitsLeft.current)
        console.log("WrongTaits: ", wrongTraits.current)
        console.log(finalList.current)
    }
    const onDone = () =>{
        console.log("done")
    }

    const isMobile = useMediaQuery('(min-width:1024px)')
    return(
        <div>
            {showPicks && <Grid container
                  spacing={isMobile ? 60 : 1}
                  alignItems="center"
                  justifyContent="center"
                  direction={isMobile ? "row" : "column"}
            >

                <Grid item>
                    <RankingTrait onClick={() => handlePick(currentTraits[0])} trait={currentTraits[0]} />
                </Grid>
                <Grid item>
                    <RankingTrait onClick={() => handlePick(currentTraits[1])} trait={currentTraits[1]} />
                </Grid>
            </Grid>}
            {showColumn && <ReorderGuess column={columnData.columns.guessing} onDone={onDone}/> }
        </div>

    )
}
export default GuessPage
