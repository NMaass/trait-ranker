import React, {useState} from "react";
import initialTraits from './initialTraits';
import {DragDropContext} from "react-beautiful-dnd";
import {Container} from "@mui/material";
import Column from './Column.js'

const App = () => {
    const [data, setData] = useState(initialTraits);

    return(
    <DragDropContext onDragEnd={onDragEnd}>
        <Container>
            {data.columnOrder.map(columnId => {
                const column = data.columns[columnId];
                const contents = column.traitIds.map(traitId =>{
                    return data.traits[traitId]
                });
                return <Column key={column.id} column={column} contents={contents}/>;
            })}
        </Container>
    </DragDropContext>)
};

export default App;
