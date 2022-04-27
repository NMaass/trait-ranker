import React from "react";
import {Button} from "@mui/material";
import listOfAllTraits from "../../Assets/listOfAllTraits";

const DoneButton = ({topTraits, setTopTraits, columnData, setColumnData, history}) => {
    const allTraits = listOfAllTraits;
    const [currentTraits, setCurrentTraits] = React.useState(allTraits.slice(0,10));


    const handleDone = () => {
        console.log(currentTraits);
        if (currentTraits[currentTraits.length-1] !== allTraits[allTraits.length-1]){
            addTopTraits(columnData.columns.column3.traitIds);
            let indexOfLastTrait = allTraits.indexOf(currentTraits[currentTraits.length-1]);
            let newTraits = allTraits.slice(indexOfLastTrait+1,indexOfLastTrait+11);
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
        <Button onClick={handleDone} size='large'>
            Done
        </Button>
    )
}
export default DoneButton;
