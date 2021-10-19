import React from "react";
import {Droppable} from "react-beautiful-dnd";
import {Container} from "@mui/material";
import styled from 'styled-components'
import Trait from './Trait';

const TraitList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'lightBlue' : 'white')};
  display: flex;
`;

const Title = styled.h3 `
padding: 8px;
`;

const Column = ({ column, traits, key}) => {
    return(
        <Container>
            <Title>{column.title}</Title>
            <Droppable droppableId={column.id} direction='horizontal'>
                {(provided, snapshot) => (
                    <TraitList
                        ref={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                        {...provided.droppableProps}>
                        {traits.map((trait, index) => <Trait key={trait.id} trait={trait} index={index}/>)}
                        {provided.placeholder}
                    </TraitList>
                )}
            </Droppable>
        </Container>
    )
}

export default Column
