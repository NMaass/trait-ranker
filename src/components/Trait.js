import React from 'react';
import styled from "styled-components";
import {Draggable} from "react-beautiful-dnd";
import TraitCard from "./TraitCard";


const Container = styled.div`
  
`;




const Trait = ({ trait, index}) => {
    return(
        <Draggable draggableId={trait} index={index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    <TraitCard trait={trait}/>
                </Container>
            )}

        </Draggable>
    )
}
export default Trait
