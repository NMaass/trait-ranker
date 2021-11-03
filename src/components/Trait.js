import React from 'react';
import styled from "styled-components";
import {Draggable} from "react-beautiful-dnd";
import TraitCard from "./TraitCard";


const Container = styled.div`
  
`;




const Trait = ({ trait, index, dragging}) => {
    return(
        dragging ? (
        <Draggable draggableId={trait.id} index={index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    <TraitCard trait={trait.content}/>
                </Container>
            )}

        </Draggable>
        ) : <TraitCard trait={trait.content}/>
    )
}
export default Trait
