import React, {useEffect, useState} from "react";
import initialTraits from './Selection/initialTraits';
import Results from "./Results";
import RankStack from "./RankStack";
import NavBar from "./NavBar/NavBar";
import {BrowserRouter, Route, useHistory} from "react-router-dom";
import SelectionPage from "./Selection/SelectionPage";





const App = () => {
    const history = useHistory();
    const [columnData, setColumnData] = useState(initialTraits);
    const [topTraits, setTopTraits] = useState([]);

    useEffect(()=>{
        sessionStorage.setItem("topTraits", topTraits)
        console.log("setting storage traits: ", sessionStorage.getItem("topTraits"), topTraits)
    },[topTraits, setTopTraits])

    const fetchTopTraits = () => {
        let storedTraits;
        if (topTraits.length > 0){
            storedTraits = topTraits
    }
        else{
            storedTraits = sessionStorage.getItem("topTraits").split(',')
            console.log("grabbing from storage:", initialTraits)
            setTopTraits(storedTraits)
            if(storedTraits[0] === " "){
                history.push('/')
            }
        }
        return storedTraits
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
        const start = columnData.columns[source.droppableId];
        const finish = columnData.columns[destination.droppableId];

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
                ...columnData,
                columns:{
                    ...columnData.columns,
                    [newColumn.id]:newColumn,
                }
            }
            setColumnData(newData);
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
            ...columnData,
            columns:{
                ...columnData.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        }
        setColumnData(newData);
    }


    return(
        <div>
            <NavBar history={history}/>
            <Route exact path='/'>
                <SelectionPage columnData={columnData} topTraits={topTraits} setTopTraits={setTopTraits} onDragEnd={onDragEnd} setColumnData={setColumnData} history={history}/>
            </Route>
            <Route path='/Rank'>
                <RankStack onDragEnd={onDragEnd} topTraits={topTraits} setTopTraits={setTopTraits} history={history} fetchTopTraits={fetchTopTraits}/>
            </Route>
            <Route path='/Results'>
                <Results topTraits={topTraits} setTopTraits={setTopTraits} fetchTopTraits={fetchTopTraits}/>
            </Route>
        </div>
    )
};

const AppWrapper = () => {
    return(
        <BrowserRouter basename={'/trait-ranker'}>
            <App/>
        </BrowserRouter>
    )
}


export default AppWrapper;
