import React, {useState} from "react";
import initialTraits from './initialTraits';
import Landing from "./Landing";
import Results from "./Results";
import RankStack from "./RankStack";
import NavBar from "./NavBar/NavBar";
import {BrowserRouter, Route, useHistory} from "react-router-dom";
import SelectionPage from "./SelectionPage";





const App = () => {
    const history = useHistory();
    const [data, setData] = useState(initialTraits);
    const [name, setName] = useState('Nick');

    const [formText, setFromText] = useState('');
    const [topTraits, setTopTraits] = useState(['this','is','my','init','array'])

    const historyPushTracksPrevious = ({route}) => {
        history.push(route)
    }
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
            <NavBar history={history}/>
            <Route exact path='/'>
                <Landing onFormSubmit={onLandingSubmit} formText={formText} setFormText={setFromText}/>
            </Route>
            <Route path='/Rank'>
                <RankStack/>
            </Route>
           <Route exact path='/Selection'>
                <SelectionPage columnData={data} onDragEnd={onDragEnd} setData={setData} data={data}/>
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
