import React, {useState} from "react";
import likedTraits from "./likedTraits";
import {Button} from "@mui/material";

const DoneButton = ({setTopTraits, columnData, setColumnData, history}) => {
    const [pickingRound, setPickingRound] = React.useState(1);

    const handleDone = () => {
        if (columnData.columns.column3.traitIds.length < 10){
            const traitNames = columnData.columns.column3.traitIds.map(traitId => {
                return columnData.traits[traitId].content;
            })

            setTopTraits(traitNames);
            history.push("/Results");
        }
        else if(pickingRound === 2){
            setTopTraits(columnData.columns.column2.traitIds);
            history.push("/Results");
        }
        else{
           setPickingRound(2);
           likedTraits.columns.column1.traitIds = columnData.columns.column3.traitIds;
           setColumnData(likedTraits);
        }
    }


    return(
        <Button onClick={handleDone}>
            Done
        </Button>
    )
}
export default DoneButton;
