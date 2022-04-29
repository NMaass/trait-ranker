import React from "react";
import DoneButton from "./DoneButton"
import Column from "./Column";
import {DragDropContext} from "react-beautiful-dnd";
import {Grid} from "@mui/material";
import listOfAllTraits from "../../Assets/listOfAllTraits";




const SelectionPage = ({columnData, onDragEnd, topTraits, setTopTraits, setColumnData, history}) =>{
    const [currentTraits, setCurrentTraits] = React.useState(listOfAllTraits.slice(0,10));

    const handleDone = () => {
        console.log(currentTraits);
        if (currentTraits[currentTraits.length-1] !== listOfAllTraits[listOfAllTraits.length-1]){
            addTopTraits(columnData.columns.column3.traitIds);
            let indexOfLastTrait = listOfAllTraits.indexOf(currentTraits[currentTraits.length-1]);
            let newTraits = listOfAllTraits.slice(indexOfLastTrait+1,indexOfLastTrait+11);
            setCurrentTraits(newTraits);
            clearColumns();
            updateColumn(newTraits);
            console.log(currentTraits);
        }
        else{
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

    const updateColumn = (newTraits) => {
        let newColumnData = columnData;
        newColumnData.columns.column2.traitIds = newTraits;
        setColumnData(newColumnData)
    }




    return(
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
            <Grid container
                  alignItems='center'
                  justifyContent="center"
            >
                <Grid item >
                    <DoneButton
                       onClick={handleDone}/>
                </Grid>
            </Grid>

        </div>
    )
};
export default SelectionPage;
