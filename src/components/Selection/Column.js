import React from "react";
import {Droppable} from "react-beautiful-dnd";
import styled from 'styled-components'
import Trait from '../Trait';
import SkipButton from "./SkipButton";
import '../../style/CardStacking.scss'

const Container = styled.div`
margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  min-width: 250px;
  margin-left: 190px;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const TraitList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'lightBlue' : 'white')};
  display: flex;
`;

const Title = styled.h3 `
padding: 8px;
`;

const Column = ({ column, traits, key, setData, data}) => {
    return(
        <Container>
            <HeaderContainer>
                <Title>{column.title}</Title>
                <SkipButton column={column} id={key} setData={setData} data={data} />
            </HeaderContainer>
            <Droppable key={column.id} droppableId={column.id} direction='horizontal'>
                {(provided, snapshot) => (
                    <TraitList
                        classname='cards fa-stack'
                        ref={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                        {...provided.droppableProps}
                    >
                        {traits.map((trait, index) => {
                            return(

                                    <Trait key={trait.id} trait={trait} index={index}  classname={index}/>

                                    )}
                        )}
                        {provided.placeholder}
                    </TraitList>
                )}
            </Droppable>
        </Container>
    )
}

export default Column
