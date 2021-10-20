import React, {useState} from "react";
import initialTraits from './initialTraits';
import {DragDropContext} from "react-beautiful-dnd";
import styled from 'styled-components';
import Column from './Column.js'

const Container = styled.div`
  display: flex;
`;



const App = () => {
    const [data, setData] = useState(initialTraits);

    const onDragEnd = ({destination, source, draggableId}) => {
        if(!destination){
            return;
        }
        //make sure the draggable moved
        if(
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ){
            return;
        }
        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];

        //if moving within the same column
        if(start === finish){
            const newTraitIds = Array.from(start.traitIds);
            newTraitIds.splice(source.index, 1);
            newTraitIds.splice(destination.index,0,draggableId);

            const newColumn = {
                ...start,
                traitIds:newTraitIds,
            };

            //override existing column
            const newData = {
                ...data,
                columns:{
                    ...data.columns,
                    [newColumn.id]:newColumn,
                }
            }
            setData(newData);
            return;
        }
        //cross column moving
        const startTraitIds = Array.from(start.traitIds);
        startTraitIds.splice(source.index,1);
        const newStart = {
            ...start,
            traitIds: startTraitIds,
        }

        const finishTraitIds = Array.from(finish.traitIds);
        finishTraitIds.splice(destination.index,0,draggableId);
        const newFinish = {
            ...finish,
            traitIds: finishTraitIds
        }

        const newData = {
            ...data,
            columns:{
                ...data.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        }
        setData(newData);
        return;
    }


    return(
    <DragDropContext onDragEnd={onDragEnd}>
        <Container>
            {data.columnOrder.map(columnId => {
                const column = data.columns[columnId];
                const contents = column.traitIds.map(traitId =>{
                    return data.traits[traitId]
                });
                return <Column key={column.id} column={column} traits={contents}/>;
            })}
        </Container>
    </DragDropContext>)
};

export default App;
