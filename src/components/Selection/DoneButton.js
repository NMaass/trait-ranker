import React from "react";
import {Button} from "@mui/material";

const DoneButton = ({onClick}) => {


    return(
        <Button onClick={onClick} size='large'>
            Done
        </Button>
    )
}
export default DoneButton;
