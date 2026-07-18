import React, { useEffect, useState, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card, Grid } from "@mui/material";

const FreeDragTrait = ({ trait, index, color, isDraggable }) => {
  const [isBouncing, setIsBouncing] = useState("");
  const [currentColor, setCurrentColor] = useState("");
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current === true) {
      firstUpdate.current = false;
      return;
    }
    setIsBouncing(false);
    // Stagger each card's bounce; change color at the bounce apex. Both timers
    // are cleared on unmount/re-run so they can't fire setState on an unmounted
    // card (React "update on unmounted component" warning + wasted work).
    let colorTimer;
    const bounceTimer = setTimeout(() => {
      setIsBouncing(true);
      colorTimer = setTimeout(() => setCurrentColor(color), 250);
    }, 500 * index);
    return () => {
      clearTimeout(bounceTimer);
      clearTimeout(colorTimer);
    };
  }, [color, index]);

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
