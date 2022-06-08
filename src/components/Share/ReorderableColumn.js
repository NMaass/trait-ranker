import React from 'react'
import {Droppable} from "react-beautiful-dnd";
import {Grid} from '@mui/material'
import FreeDragTrait from "../TraitCards/FreeDragTrait";

const ReorderableColumn = ({traits}) =>{
    const compositeID = traits[0]+traits[1]

    return(
        <div>
            <Droppable key={compositeID} droppableId={compositeID}>
                {(provided)=>(
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                    <Grid
                        container
                        direction='column'
                    >
                        {traits.map(trait =>{
                            return(
                                <Grid item key={trait} margin="auto">
                                    <FreeDragTrait trait={trait} index={traits.indexOf(trait)}/>
                                </Grid>
                            )
                        })}
                        {provided.placeholder}
                    </Grid>
                    </div>
                )}
            </Droppable>

        </div>
    )
}
export default ReorderableColumn
