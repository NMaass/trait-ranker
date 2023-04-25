import React from "react";
import ReorderableColumn from "./ReorderableColumn";
import { Button, Grid } from "@mui/material";
import TryItButton from "./TryItButton";

const ReorderGuess = ({
  column,
  onDone,
  colors,
  showTryIt,
  history,
  isDraggable,
  showLockIn,
}) => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <ReorderableColumn
          column={column}
          colors={colors}
          isDraggable={isDraggable}
        />
      </Grid>
      <Grid item sx={{ padding: "4vh" }}>
        {showLockIn && (
          <Button onClick={onDone} variant="contained">
            Lock in
          </Button>
        )}
        {showTryIt && <TryItButton history={history} />}
      </Grid>
    </Grid>
  );
};
export default ReorderGuess;
