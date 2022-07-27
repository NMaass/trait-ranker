import React from "react";
import ReorderableColumn from "./ReorderableColumn";
import { Button, Grid } from "@mui/material";
import TryItButton from "./TryItButton";

const ReorderGuess = ({ column, onDone, colors, showTryIt, history }) => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item sx={{ padding: "5vh" }}>
        Rearange the traits to your best guess
      </Grid>
      <Grid item>
        <ReorderableColumn column={column} colors={colors} />
      </Grid>
      <Grid item sx={{ padding: "5vh" }}>
        <Button
          onClick={onDone}
          variant="contained"
        >
          Lock in
        </Button>
      </Grid>
       <Grid item>
         { showTryIt && <TryItButton history={history}/>}
       </Grid>
    </Grid>
  );
};
export default ReorderGuess
