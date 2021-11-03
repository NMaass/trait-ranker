import React, {useState} from "react";
import initialTraits from './initialTraits';
import {DragDropContext} from "react-beautiful-dnd";
import styled from 'styled-components';
import Column from './Column.js';
import Landing from "./Landing";
import Results from "./Results";
import RankStack from "./RankStack";
import {BrowserRouter, Route, useHistory} from "react-router-dom";
import SkipButton from "./SkipButton";

const Container = styled.div`
  display: flex;
`;



const App = () => {
    const history = useHistory();
    const [data, setData] = useState(initialTraits);
    const [name, setName] = useState('Nick');
    const [formText, setFromText] = useState('');
    const [topTraits, setTopTraits] = useState(['this','is','my','init','array'])

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
    }

    const onLandingSubmit = (event) => {
        event.preventDefault();
        setName(event.target.value);
        history.push('/Selection');
    }


    return(
        <div>
            <Route exact path='/fixme'>
                <Landing onFormSubmit={onLandingSubmit} formText={formText} setFormText={setFromText}/>
            </Route>
            <Route path='/Rank'>
                <RankStack/>
            </Route>
           <Route exact path='/'>
               <SkipButton column={data.columns.column2}/>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Container>
                        {data.columnOrder.map(columnId => {
                            const column = data.columns[columnId];
                            const traits = column.traitIds.map(traitId =>{
                                return data.traits[traitId]
                            });
                            return <Column key={column.id} column={column} traits={traits}/>;
                        })}
                    </Container>
                </DragDropContext>
           </Route>
            <Route path='/Results'>
                <Results name={name} topTraits={topTraits}/>
            </Route>
        </div>
    )
};

const AppWrapper = () => {
    return(
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    )
}


export default AppWrapper;
