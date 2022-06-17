import React from "react";
import ReorderableColumn from "./ReorderableColumn";
import {Button, Grid} from "@mui/material";


const ReorderGuess = ({column, onDone}) =>{


    return(
        <Grid container direction='column'>
            <Grid item>
                Rearange the traits to your best guess
            </Grid>
            <Grid item>
                <ReorderableColumn column={column} />
            </Grid>
            <Grid item>
                <Button onClick={onDone}>
                    Lock in
                </Button>
            </Grid>
        </Grid>
    )
}
export default ReorderGuess
