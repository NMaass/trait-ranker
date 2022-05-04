import React from 'react';
import styled from "styled-components";
import {Draggable} from "react-beautiful-dnd";
import TraitCard from "./TraitCard";

const Container = styled.div`
  
`;


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

const Trait = ({ trait, index}) => {
    return(
        <Draggable draggableId={trait} key={trait} index={index} >
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    style={draggingCustomStyle(provided.draggableProps.style)}
                >

                        <TraitCard trait={trait} />
                </Container>
            )}

        </Draggable>
    )
}
export default Trait
