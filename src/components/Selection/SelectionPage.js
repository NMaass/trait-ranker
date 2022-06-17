import React, {useEffect} from "react";
import SelectionDroppable from "./SelectionDroppable";
import {Box, Grid} from "@mui/material";
import {useSwipeable} from "react-swipeable";





const SelectionPage = ({columnData,  setTopTraits,  history}) =>{

    const swipeHandlers = useSwipeable(({
        onSwipedLeft: () => console.log('swiped left'),
        onSwipedRight: () => console.log('right')
    }))


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
