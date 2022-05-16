import React from "react";
import {Droppable} from "react-beautiful-dnd";
import styled from 'styled-components'
import Trait from '../Traits/Trait';
import SkipButton from "./SkipButton";
import '../../style/CardStacking.scss'
import listOfAllTraits from "../../Assets/listOfAllTraits";
import {Grid} from "@mui/material";

const Container = styled.div`
  display: flex;
`;


const TraitList = styled.div`
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? props.hoverColor: 'white')};
  display: flex;
  min-width: ${props => (props.isStarter ? '1px' : '49.9vw')};
  min-height:  100vh;
  max-width: ${props =>(props.isStarter && '1px')};
`;



const Column = ({ column, isStarter = false, hoverColor = 'lightBlue'}) => {
    return(
        <Container>
            <Droppable key={column.id} droppableId={column.id} direction='horizontal'>
                {(provided, snapshot) => (
                    <TraitList
                        classname='cards stack'
                        ref={provided.innerRef}
                        isStarter={isStarter}
                        hoverColor = {hoverColor}
                        isDraggingOver={snapshot.isDraggingOver}
                        {...provided.droppableProps}
                    >
                        <Grid
                            container
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Grid item margin="auto">
                        {isStarter && <Trait key={column?.traitIds[0]}
                                             trait={column?.traitIds[0]}
                                             index={column?.traitIds.indexOf(column?.traitIds[0])}
                        />}
                        {provided.placeholder}
                            </Grid>
                        </Grid>
                    </TraitList>
                )}
            </Droppable>
        </Container>
    )
}

export default Column
