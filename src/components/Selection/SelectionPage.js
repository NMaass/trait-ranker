import React, {useEffect} from "react";
import SelectionDroppable from "./SelectionDroppable";
import {DragDropContext} from "react-beautiful-dnd";
import {Box, Grid} from "@mui/material";





const SelectionPage = ({columnData, onDragEnd,  setTopTraits,  history}) =>{

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
                <div>
                    <DragDropContext onDragEnd={onDragEnd} direction={'row'}>
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
                    </DragDropContext>
                </div>
        </Box>
    )
};
export default SelectionPage;
