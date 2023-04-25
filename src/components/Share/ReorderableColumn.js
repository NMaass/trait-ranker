import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Grid } from "@mui/material";
import FreeDragTrait from "../TraitCards/FreeDragTrait";
import styled from "styled-components";
import FadeTextSeries from "../../utils/FadeTextSeries";

const DragColumn = styled.div``;

const ReorderableColumn = ({ column, colors, isDraggable }) => {
  const tutorialStrings = ["Rearrange to the guess list order"];
  return (
    <div>
      <div className="rankingFade" style={{ marginBottom: "2vh" }}>
        <FadeTextSeries stringArray={tutorialStrings} />
      </div>

      <Droppable key={column.id} droppableId={column.id}>
        {(provided, snapshot) => (
          <DragColumn
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              {column.traitIds.map((trait, index) => {
                return (
                  <Grid item key={trait}>
                    <FreeDragTrait
                      trait={trait}
                      index={column.traitIds.indexOf(trait)}
                      color={colors[index]}
                      isDraggable={isDraggable}
                    />
                  </Grid>
                );
              })}
              {provided.placeholder}
            </Grid>
          </DragColumn>
        )}
      </Droppable>
    </div>
  );
};
export default ReorderableColumn;
