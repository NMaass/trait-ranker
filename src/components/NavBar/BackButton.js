import React from "react";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import {IconButton} from "@mui/material";

const BackButton = ({history}) => {
    const handleBack = () =>{
        history.goBack();
    }


    return(
        <IconButton
        size="large"
        onClick={handleBack}
        >
            <ArrowLeftIcon/>
        </IconButton>
    )
}
export default BackButton;
