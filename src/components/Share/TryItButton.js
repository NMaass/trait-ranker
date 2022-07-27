import React from 'react';
import {Button} from "@mui/material"

const TryItButton = ({history}) =>{
    const tryIt = () =>{
        history.push('/');
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
