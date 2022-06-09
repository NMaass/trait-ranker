import React, {useEffect, useState} from "react";
import initialTraits from './Selection/initialTraits';
import ResultsPage from "./ResultsPage";
import RankingPage from "./RankingPage";
import NavBar from "./NavBar/NavBar";
import {BrowserRouter, Route, useHistory} from "react-router-dom";
import SelectionPage from "./Selection/SelectionPage";
import ReactGA from 'react-ga';
import allTraits from "../utils/listOfAllTraits";
import SharedPage from "./Share/SharedPage";
import {DragDropContext} from "react-beautiful-dnd";




const App = () => {
    const history = useHistory();
    const [columnData, setColumnData] = useState(initialTraits);
    const [topTraits, setTopTraits] = useState(allTraits.splice(0,10));
    const TRACKING_ID = "G-4RLGL8ENZC";
    ReactGA.initialize(TRACKING_ID);

    useEffect(()=>{
        const traits = JSON.stringify(topTraits)
        localStorage.setItem("traits", traits)
        console.log("setting storage traits: ", JSON.parse(localStorage.getItem("traits")))
    },[topTraits])

    const fetchTopTraits = () => {
        let storedTraits;
        if (topTraits.length > 0){
            console.log("getting top traits", topTraits)
            storedTraits = topTraits
            }
        else{
            storedTraits = JSON.parse(localStorage.getItem("traits"))
            console.log("grabbing from storage:", storedTraits)
            if(storedTraits.length === 0){
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
            <DragDropContext onDragEnd={onDragEnd}>
             <NavBar history={history}/>
                <Route exact path='/'>
                    <SelectionPage columnData={columnData} topTraits={topTraits} setTopTraits={setTopTraits} onDragEnd={onDragEnd} setColumnData={setColumnData} history={history}/>
                 </Route>
                 <Route path='/Rank'>
                    <RankingPage onDragEnd={onDragEnd} topTraits={topTraits} setTopTraits={setTopTraits} history={history} fetchTopTraits={fetchTopTraits}/>
                 </Route>
                <Route path='/Results'>
                     <ResultsPage topTraits={topTraits} setTopTraits={setTopTraits} fetchTopTraits={fetchTopTraits}/>
                </Route>
                 <Route path='/Share/:id' children={<SharedPage />}/>
            </DragDropContext>
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
