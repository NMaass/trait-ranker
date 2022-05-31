import React, {useState} from 'react';
import {Button, Grid, InputLabel, Tooltip} from "@mui/material";

const CopyableLink = ({text}) =>{
    const [showTooltip, setShowTooltip] = useState(false);
    const onCopy = () =>{
        navigator.clipboard.writeText(text)
            .then(() => console.log("Copied!"))
            .catch(()=> console.log("Copy failed"));
        setShowTooltip(true);
    }
    const onTipClose = () => {
        setShowTooltip(false)
    }
    return(
        <Grid container direction="row">
            <Grid item>
                <Tooltip
                    title={"Copied to clipboard!"}
                    open={showTooltip}
                    leaveDelay={1000}
                    onClose={onTipClose}
                >
                <Button
                    variant="contained"
                    onClick={onCopy}
                >
                    Copy and Share!
                </Button>
                </Tooltip>
            </Grid>
            <Grid item>
                <InputLabel
                    varient="filled"
                >
                    {text}
                </InputLabel>
            </Grid>
        </Grid>
    )
}
export default CopyableLink
