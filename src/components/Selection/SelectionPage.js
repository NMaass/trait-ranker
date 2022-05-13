import React, {useEffect} from "react";
import Column from "./Column";
import {DragDropContext} from "react-beautiful-dnd";
import {Box, Fade, Grid} from "@mui/material";
import listOfAllTraits from "../../Assets/listOfAllTraits";




const SelectionPage = ({columnData, onDragEnd, topTraits, setTopTraits, setColumnData, history}) =>{
    const [currentTraits, setCurrentTraits] = React.useState(columnData.columns.column2.traitIds);
    const selectionFaded= React.useRef(true);

    useEffect(()=>{
        console.log("currentTraits: ", columnData.columns.column2.traitIds)
        console.log("top traits: ", columnData.columns.column3.traitIds)
        if(columnData.columns.column2.traitIds.length === 0){
            console.log(columnData.columns.column3.traitIds)
               setTopTraits(columnData.columns.column3.traitIds);
               history.push("/Rank");
           }

    },[columnData, history, setTopTraits])

    const handleSelected = () => {
        let currentColumn = columnData.columns.column2.traitIds;
        if (currentTraits[currentTraits.length - 1] !== listOfAllTraits[listOfAllTraits.length - 1]) {
                addTopTraits(columnData.columns.column3.traitIds);
                let indexOfFirstTrait = listOfAllTraits.indexOf(currentColumn[0]);
                currentColumn.push(listOfAllTraits[indexOfFirstTrait+1]);
                setCurrentTraits(currentColumn);
                updateStarterColumn(currentColumn);
                console.log(currentTraits);
        }
        else {
                addTopTraits(columnData.columns.column3.traitIds)
                history.push("/Rank");
        }
    }
    const addTopTraits = (traitsToAdd) => {
        let newTopTraits = topTraits;
        newTopTraits = newTopTraits.concat(traitsToAdd);
        setTopTraits(newTopTraits);
    }
    const clearColumns = () => {
        let newColumnData = columnData;
        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of Object.entries(newColumnData.columns)){
            value.traitIds = [];
        }
        setColumnData(newColumnData);
    }

    const updateStarterColumn = (newTraits) => {
        let newColumnData = columnData;
        newColumnData.columns.column2.traitIds = newTraits;
        setColumnData(newColumnData)
    }




    return(
        <Box height={'100vh'} width={'100vw'}>
                <div>
                    <DragDropContext onDragEnd={onDragEnd} direction={'row'}>
                        <Grid container spacing={0}>
                            <Grid item key={columnData.columnOrder[0]}>
                                <Column column={columnData.columns.column1} hoverColor={'LightPink'}/>
                            </Grid>
                            <Grid item key={columnData.columnOrder[1]}>
                                <Column column={columnData.columns.column2} isStarter={true} />
                            </Grid>
                            <Grid item key={columnData.columnOrder[2]}>
                                <Column column={columnData.columns.column3} hoverColor={'LightGreen'}/>
                            </Grid>
                        </Grid>
                    </DragDropContext>
                </div>
        </Box>
    )
};
export default SelectionPage;
