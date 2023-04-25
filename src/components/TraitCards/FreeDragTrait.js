import React, { useEffect, useState, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card, Grid } from "@mui/material";

const FreeDragTrait = ({ trait, index, color, isDraggable }) => {
  const [isBouncing, setIsBouncing] = useState(false);
  const [currentColor, setCurrentColor] = useState("");
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current == true) {
      firstUpdate.current = false;
      return;
    }
    setTimeout(() => {
      setIsBouncing(true);
      setTimeout(() => setCurrentColor(color), 250); //timeout set to half bounce time to time color change to apex
    }, 500 * index); //timeout set to total bounce time to have items bounce one at a time
    setIsBouncing(false);
  }, [color]);

  return (
    <Draggable draggableId={trait} index={index} isDragDisabled={!isDraggable}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Card
            className={`wideCard ${isBouncing ? "bounce" : ""}`}
            sx={{ backgroundColor: currentColor }}
          >
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
