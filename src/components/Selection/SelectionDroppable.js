import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import TraitDraggable from "../TraitCards/TraitDraggable";
import "../../style/CardStyle.scss";
import { Grid } from "@mui/material";
const Container = styled.div`
  display: flex;
`;

const TraitList = styled.div`
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? props.hoverColor : "white"};
  display: flex;
  align-items: center;
  min-width: ${(props) => (props.isStarter ? "1px" : "49.9vw")};
  min-height: 100vh;
  min-height: 100dvh;
  /* Center the card between the instruction text (top) and the Pass/Keep
     action bar (bottom) rather than in the raw viewport, so neither can
     overlap the card — including on phones where browser chrome shrinks the
     visible area below 100vh. */
  padding: 120px 0 170px;
  box-sizing: border-box;
  max-width: ${(props) => props.isStarter && "1px"};
  ${(props) =>
    props.showHoverColor &&
    `
    background-color: ${props.hoverColor};
  `}
`;

const SelectionDroppable = ({
  column,
  isStarter = false,
  slideUp = false,
  hoverColor = "lightBlue",
}) => {
  const [shouldWiggle, setShouldWiggle] = useState(isStarter);
  const [showHoverColor, setShowHoverColor] = useState(false);
  const [firstCard, setFirstCard] = useState(true);

  React.useEffect(() => {
    if (isStarter) {
      const timer = setTimeout(() => {
        setShouldWiggle(false);
        setFirstCard(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowHoverColor(true);
      const timer = setTimeout(() => {
        setShowHoverColor(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isStarter]);

  return (
    <Droppable key={column.id} droppableId={column.id} direction="horizontal">
      {(provided, snapshot) => (
        <TraitList
          classname="cards stack"
          ref={provided.innerRef}
          isStarter={isStarter}
          hoverColor={hoverColor}
          isDraggingOver={snapshot.isDraggingOver}
          showHoverColor={showHoverColor}
          {...provided.droppableProps}
        >
          {isStarter && (
            <TraitDraggable
              key={column?.traitIds[0]}
              trait={column?.traitIds[0]}
              index={column?.traitIds.indexOf(column?.traitIds[0])}
              wiggle={shouldWiggle}
              firstCard={firstCard}
              slideUp={slideUp}
              deckSize={column?.traitIds.length || 0}
            />
          )}
          {provided.placeholder}
        </TraitList>
      )}
    </Droppable>
  );
};

export default SelectionDroppable;
