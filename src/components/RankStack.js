import React from "react";
import Trait from "./Trait";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import styled from "styled-components";


const Container = styled.div`
display: flex;
`;

const RankStack = ({onDragEnd, topTraits, setTopTraits, history}) => {
    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Container>
                    <Droppable key={'rank'} droppableId={'rank'} direction='vertical'>
                        {(provided, snapshot) => (
                            <Container
                                ref={provided.innerRef}
                                isDraggingOver={snapshot.isDraggingOver}
                                {...provided.draggableProps}>
                                {topTraits.map((trait, index) =>{
                                    return(
                                        <Trait key={topTraits.indexOf(trait)} trait={trait} index={index}/>

                                        )
                                }
                                    )}
                                {provided.placeholder}
                            </Container>
                        )}
                    </Droppable>
                </Container>
            </DragDropContext>
        </div>
    )
};

export default RankStack;
