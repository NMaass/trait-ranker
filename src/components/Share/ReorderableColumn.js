import React, {useState} from 'react'
import {Droppable} from "react-beautiful-dnd";
import {Grid} from '@mui/material'
import FreeDragTrait from "../TraitCards/FreeDragTrait";
import styled from 'styled-components';

const DragColumn = styled.div`
  min-height: 35vh;
  min-width: 8vw;
  display: flex;
`

const ReorderableColumn = ({ column}) =>{

    return(
        <div>
            <Droppable key={column.id} droppableId={column.id}>
                {(provided,snapshot)=>(
                    <DragColumn
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                        <Grid
                        container
                        direction='column'
                        >
                        {column.traitIds.map(trait =>{
                            return(
                                <Grid item key={trait} margin="auto">
                                    <FreeDragTrait trait={trait} index={column.traitIds.indexOf(trait)}/>
                                </Grid>
                            )
                        })}
                        </Grid>
                        {provided.placeholder}
                    </DragColumn>
                )}

            </Droppable>
        </div>
    )
}
export default ReorderableColumn
