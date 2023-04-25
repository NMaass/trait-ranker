import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card, Grid } from "@mui/material";

const FreeDragTrait = ({ trait, index, color, isDraggable }) => {
  return (
    <Draggable draggableId={trait} index={index} isDragDisabled={!isDraggable}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Card className="wideCard" sx={{ backgroundColor: color }}>
            <Grid container justifyContent="center">
              <Grid item>
                <h3>{trait}</h3>
              </Grid>
            </Grid>
          </Card>
        </div>
      )}
    </Draggable>
  );
};
export default FreeDragTrait;
