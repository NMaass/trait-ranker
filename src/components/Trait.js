import React from 'react';
import styled from "styled-components";
import {Draggable} from "react-beautiful-dnd";

const Container = styled.div`
  border: 3px solid lightgray;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen': 'white')};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  
  display: flex;
  justify-content: center;
  align-content: center;
  
  &:focus{
    outline: none;
    border-color: red;
  }
`;


const Trait = ({ trait, index}) => {
    return(
        <Draggable draggableId={trait.id} index={index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}>
                    {trait.content[0]}
                </Container>
            )}

        </Draggable>
    )
}
export default Trait
