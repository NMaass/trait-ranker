// @flow
import React, {useEffect, useRef, useState} from "react";
import SelectionDroppable from "./SelectionDroppable";
import {Box, Grid} from "@mui/material";
import {useSwipeable} from "react-swipeable";
import type {PreDragActions, SensorAPI, SnapDragActions} from "react-beautiful-dnd/src/types";



function noop() {}


const SelectionPage = ({columnData,  setTopTraits,  history, sensorAPIRef}) =>{
    const [isDragging, setIsDragging] = useState(false);
    const [isControlDragging, setIsControlDragging] = useState(false);
    const actionsRef = useRef<?SnapDragActions>(null);

    const swipeHandlers = useSwipeable(({
        onSwipedLeft: () => {
            console.log("swiped left")
            const currentTrait = columnData.columns.column2.traitIds[0]
            lift(currentTrait);
            maybe((callbacks: SnapDragActions) => callbacks.moveDown());
            maybe((callbacks: SnapDragActions) => {
                actionsRef.current = null;
                callbacks.drop();
            })
            setIsDragging(false);
            setIsControlDragging(false);
        },
        onSwipedRight: () => {
            const currentTrait = columnData.columns.column2.traitIds[0];
            lift(currentTrait);
            maybe((callbacks:SnapDragActions) => callbacks.moveUp());
            maybe((callbacks: SnapDragActions) => {
                actionsRef.current = null;
                callbacks.drop();
            })
            setIsDragging(false);
            setIsControlDragging(false);

        }
    }))
    function maybe(fn: (callbacks: SnapDragActions) => void) {
        if (actionsRef.current) {
            fn(actionsRef.current);
        }
    }
    function lift(traitId: string): ?SnapDragActions{
        if (isDragging){
            return null;
        }
        const api: ?SensorAPI = sensorAPIRef.current;

        if(!api){
            console.warn('unable to find sensor api');
            return null;
        }
        const preDrag: ?PreDragActions = api.tryGetLock(traitId, noop);

        if(!preDrag) {
            console.log('unable to start capturing')
            return null;
        }
        setIsControlDragging(true);
        return preDrag.snapLift();
    }
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
                <div {...swipeHandlers}>
                        <Grid container
                              spacing={0}
                              wrap="nowrap">
                            <Grid item key={columnData.columnOrder[0]}>
                                <SelectionDroppable column={columnData.columns.column1} hoverColor={'LightPink'}/>
                            </Grid>
                            <Grid item key={columnData.columnOrder[1]}>
                                <SelectionDroppable column={columnData.columns.column2} isStarter={true} />
                            </Grid>
                            <Grid item key={columnData.columnOrder[2]}>
                                <SelectionDroppable column={columnData.columns.column3} hoverColor={'LightGreen'}/>
                            </Grid>
                        </Grid>
                </div>
        </Box>
    )
};
export default SelectionPage;
