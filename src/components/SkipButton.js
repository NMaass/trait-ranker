import React from "react";
import {IconButton} from "@mui/material";
import SkipNextIcon from '@mui/icons-material/SkipNext';

const SkipButton = ({column}) => {
    const handleSkip = () => {
        column.traitIds.splice(0,0,column.traitIds[column.traitIds.length-1]);
        column.traitIds.splice(column.traitIds.length-1,1)
        console.log(column.traitIds)
    }
  return(
      <IconButton aria-label="skip" onClick={handleSkip}>
            <SkipNextIcon/>
      </IconButton>
  )
};

export default SkipButton;
