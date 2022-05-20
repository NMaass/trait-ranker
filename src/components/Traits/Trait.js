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
            transform: axisLockX
        };
    }
    return style;
};

function getStyle(style, snapshot) {
    style = draggingCustomStyle(style)
    if (!snapshot.isDropAnimating) {
        return style;
    }
    const { moveTo, curve, duration } = snapshot.dropAnimation;
    // move to the right spot
    const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;

    // patching the existing style
    return {
        ...style,
        transform: translate,
        // slowing down the drop because we can
        transition: `all ${curve} ${duration + 1}s`,
    };
}

const Trait = ({ trait, index}) => {
    return(
        <Draggable draggableId={trait} key={trait} index={index} >
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    style={getStyle(provided.draggableProps.style, snapshot)}
                >
                        <TraitCard trait={trait} provided={provided} />
                </Container>
            )}

        </Draggable>
    )
}
export default Trait
