// @flow
import React, {useEffect, useRef, useState} from "react";
import SelectionDroppable from "./SelectionDroppable";
import {Box, Grid} from "@mui/material";
import {useSwipeable} from "react-swipeable";
import type {PreDragActions, SensorAPI, SnapDragActions} from "react-beautiful-dnd/src/types";



function noop() {}


const SelectionPage = ({columnData,  setTopTraits,  history, swipeHandlers}) =>{

    useEffect(()=>{
        console.log("currentTraits: ", columnData.columns.column2.traitIds)
        console.log("top traits: ", columnData.columns.column3.traitIds)
        if(columnData.columns.column2.traitIds.length === 0){
            console.log(columnData.columns.column3.traitIds)
               setTopTraits(columnData.columns.column3.traitIds);
               history.push("/Rank");
           }

    },[columnData, history, setTopTraits])

    return(
        <Box>
                <div {...swipeHandlers} >
                        <Grid container
                              spacing={0}
                              wrap="nowrap">
                                <SelectionDroppable key={columnData.columns.column1.id} column={columnData.columns.column1} hoverColor={'LightPink'}/>
                                <SelectionDroppable key={columnData.columns.column2.id} column={columnData.columns.column2} isStarter={true} />
                                <SelectionDroppable key={columnData.columns.column3.id} column={columnData.columns.column3} hoverColor={'LightGreen'}/>
                        </Grid>
                </div>
        </Box>
    )
};
export default SelectionPage;
