import React, {useEffect} from "react";
import DoneButton from "./DoneButton"
import Column from "./Column";
import {DragDropContext} from "react-beautiful-dnd";
import {Fade, Grid} from "@mui/material";
import listOfAllTraits from "../../Assets/listOfAllTraits";




const SelectionPage = ({columnData, onDragEnd, topTraits, setTopTraits, setColumnData, history}) =>{
    const [currentTraits, setCurrentTraits] = React.useState(columnData.columns.column2.traitIds);
    const selectionFaded= React.useRef(true);

    useEffect(()=>{
        //handleSelected()
    },[columnData])

    const handleSelected = () => {
        let currentColumn = columnData.columns.column2.traitIds;
        console.log("current column length: ", currentColumn.length, "current column: ", currentColumn)
        if (currentColumn.length < 5) {
            if (currentTraits[currentTraits.length - 1] !== listOfAllTraits[listOfAllTraits.length - 1]) {
                addTopTraits(columnData.columns.column3.traitIds);
                let indexOfFirstTrait = listOfAllTraits.indexOf(currentColumn[0]);
                currentColumn.push(listOfAllTraits[indexOfFirstTrait+1]);
                setCurrentTraits(currentColumn);
                updateStarterColumn(currentColumn);
                console.log(currentTraits);
            } else {
              history.push("/Rank");
        }
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
        <div>
                <div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Grid container>
                        {
                        columnData.columnOrder.map(columnId => {
                        const column = columnData.columns[columnId];
                        return (
                            <Grid item key={column.id}>
                                <Column column={column} traits={column.traitIds} setData={setColumnData} data={columnData} />
                            </Grid>
                        )}
                        )}
                        </Grid>
                    </DragDropContext>
                </div>
        </div>
    )
};
export default SelectionPage;
