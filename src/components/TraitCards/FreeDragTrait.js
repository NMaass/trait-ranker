import React from 'react';
import {Draggable} from "react-beautiful-dnd";
import ReorderTrait from "./ReorderTrait";
import styled from "styled-components";

const FreeDragTrait = ({trait, index}) => {

    const Container = styled.div`
        display: flex;
    `;
    return(
        <Draggable draggableId={trait} index={index}>
            {(provided)=>(
                <Container
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    >
                    <ReorderTrait trait={trait} provided={provided} />
                </Container>
            )}
        </Draggable>
    )
}
export default FreeDragTrait;
