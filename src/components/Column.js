import React from "react";
import {Droppable} from "react-beautiful-dnd";
import styled from 'styled-components'
import Trait from './Trait';
import TraitCard from "./TraitCard";
import '../style/CardStacking.scss'

const Container = styled.div`
margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  min-width: 250px;
  margin-left: 190px;
  display: flex;
  flex-direction: column;
`;

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
                        classname='cards'
                        ref={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                        {...provided.droppableProps}
                    >
                        {traits.map((trait, index) => {
                            return(
                                (index === (traits.length - 1)) ? <Trait key={trait.id} trait={trait} index={index} dragging={true}/> : <Trait key={trait.id} trait={trait} index={index} dragging={false}/>

                                )
                            }
                        )}
                        {provided.placeholder}
                    </TraitList>
                )}
            </Droppable>
        </Container>
    )
}

export default Column
