import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

import SelectionTrait from "./SelectionTrait";

const Container = styled.div``;

const draggingCustomStyle = (style: React.CSSProperties | undefined) => {
  if (style?.transform) {
    const axisLockX = `${style.transform.split(",").shift()}, 0px)`;
    return {
      ...style,
      transform: axisLockX,
    };
  }
  return style;
};

function getStyle(style, snapshot) {
  style = draggingCustomStyle(style);
  if (!snapshot.isDropAnimating) {
    return style;
  }
  const { moveTo, duration } = snapshot.dropAnimation;
  const draggingOver = snapshot.draggingOver;
  console.log(draggingOver);
  let offset = 0;
  if (draggingOver === "column1") {
    offset = -100;
  } else if (draggingOver === "column3") {
    offset = 100;
  }
  // move to the right spot
  const translate = `translate(${offset}vw, ${moveTo.y}px)`;

  // patching the existing style
  return {
    ...style,
    transform: translate,
    // slowing down the drop
    transition: `all  ${duration + 0.2}s`,
  };
}

const TraitDraggable = ({ trait, index, wiggle, firstCard, slideUp }) => {
  return (
    <Draggable draggableId={trait} key={trait} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          style={getStyle(provided.draggableProps.style, snapshot)}
          className={`${wiggle ? "wiggle-animation" : ""}${
            slideUp ? " slide-up" : ""
          }`}
        >
          <SelectionTrait
            trait={trait}
            firstCard={firstCard}
            provided={provided}
          />
        </Container>
      )}
    </Draggable>
  );
};
export default TraitDraggable;
