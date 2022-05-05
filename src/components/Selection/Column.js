import React from "react";
import {Droppable} from "react-beautiful-dnd";
import styled from 'styled-components'
import Trait from '../Traits/Trait';
import SkipButton from "./SkipButton";
import '../../style/CardStacking.scss'
import listOfAllTraits from "../../Assets/listOfAllTraits";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;


const TraitList = styled.div`
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'lightBlue' : 'white')};
  display: flex;
  min-width: ${props => (props.isStarter ? '1px' : '50rem')};
  min-height: ${props => (props.isStarter ? '1px' : '50rem')};
`;



const Column = ({ column, isStarter = false}) => {
    return(
        <Container>
            <Droppable key={column.id} droppableId={column.id} direction='horizontal'>
                {(provided, snapshot) => (
                    <TraitList
                        classname='cards stack'
                        ref={provided.innerRef}
                        isStarter={isStarter}
                        isDraggingOver={snapshot.isDraggingOver}
                        {...provided.droppableProps}
                    >
                        {isStarter && <Trait key={column?.traitIds[0]} trait={column?.traitIds[0]} index={column?.traitIds.indexOf(column?.traitIds[0])}/>}
                        {provided.placeholder}
                    </TraitList>
                )}
            </Droppable>
        </Container>
    )
}

export default Column
