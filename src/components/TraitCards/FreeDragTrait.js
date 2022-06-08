import React from 'react';
import {Draggable} from "react-beautiful-dnd";
import ReorderTrait from "./ReorderTrait";


const FreeDragTrait = ({trait, index}) => {


    return(
        <Draggable draggableId={trait} key={trait} index={index}>
            {(provided)=>(
                <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    >
                    <ReorderTrait trait={trait} provided={provided} />
                </div>
            )}
        </Draggable>
    )
}
export default FreeDragTrait;
