import React from 'react';
import {Button} from "@mui/material";
import {trackShareConversion} from "../../utils/mixpanel"

const TryItButton = ({history, source}) =>{
    const tryIt = () =>{
        trackShareConversion(source);
        history.replace('/');
    }
    return(
        <Button onClick={tryIt}
                variant='contained'
            >
            Try it!
        </Button>
    )
}
export default TryItButton;
