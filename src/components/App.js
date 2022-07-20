// @flow
import React, {useCallback, useEffect, useRef, useState} from "react";
import initialTraits from './Selection/initialTraits';
import ResultsPage from "./ResultsPage";
import RankingPage from "./RankingPage";
import NavBar from "./NavBar/NavBar";
import {HashRouter, Route, useHistory} from "react-router-dom";
import SelectionPage from "./Selection/SelectionPage";
import ReactGA from 'react-ga';
import SharedPage from "./Share/SharedPage";
import {DragDropContext} from "react-beautiful-dnd";
import type {
    FluidDragActions,
    PreDragActions,
    SensorAPI,
} from "react-beautiful-dnd/src/types";
import {useSwipeable} from "react-swipeable";




const App = () => {
    const history = useHistory();
    const [columnData, setColumnData] = useState(initialTraits);
    const [topTraits, setTopTraits] = useState([]);
    const sensorAPIRef = useRef<?SensorAPI>(null);
    const actionsRef = useRef<?FluidDragActions>(null);
    const TRACKING_ID = "G-4RLGL8ENZC";
    ReactGA.initialize(TRACKING_ID);

    const onDragEnd = ({destination, source, draggableId}) => {
        if (!destination) {
            return;
        }
        //make sure the draggable moved
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        const start = columnData.columns[source.droppableId];
        const finish = columnData.columns[destination.droppableId];

        //if moving within the same column
        if (start === finish) {

            const newTraitIds = Array.from(start.traitIds);
            newTraitIds.splice(source.index, 1);
            newTraitIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                traitIds: newTraitIds,
            };

            //override existing column
            const newData = {
                ...columnData,
                columns: {
                    ...columnData.columns,
                    [newColumn.id]: newColumn,
                }
            }
            setColumnData(newData);
            return;
        }
        //cross column moving
        const startTraitIds = Array.from(start.traitIds);
        startTraitIds.splice(source.index, 1);
        const newStart = {
            ...start,
            traitIds: startTraitIds,
        }

        const finishTraitIds = Array.from(finish.traitIds);
        finishTraitIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            traitIds: finishTraitIds
        }

        const newData = {
            ...columnData,
            columns: {
                ...columnData.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        }
        setColumnData(newData);
    }
    async function swipe(direction){
       const api: ?SensorAPI = sensorAPIRef.current;
       if(!api){
           console.warn('unable to find sensor api');
           return null;
       }

       const preDrag = api.tryGetLock(columnData.columns.column2.traitIds[0]);

       if(!preDrag){
           console.log('unable to start capturing');
           return null;
       }

       const drag = preDrag.fluidLift({x:0,y:0});

       if (direction === 'right'){
           drag.move({x:200, y:0});
       }
       else{
           drag.move({x:-200, y:0});
       }
    }

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            console.log("left swiped")
            swipe('left')
        },
        onSwipedRight: () => {
            console.log("right swiped")
            swipe('right')
        },
    })



    return(
        <div>
            <DragDropContext onDragEnd={onDragEnd}  sensors={[(api) => {sensorAPIRef.current = api;},
            ]}>
             <NavBar history={history}/>
                <Route exact path='/'>
                    <SelectionPage columnData={columnData} topTraits={topTraits} setTopTraits={setTopTraits} setColumnData={setColumnData} history={history} swipeHandlers={swipeHandlers} />
                 </Route>
                 <Route path='/Rank'>
                    <RankingPage topTraits={topTraits} setTopTraits={setTopTraits} history={history} />
                 </Route>
                <Route path='/Results'>
                     <ResultsPage topTraits={topTraits} setTopTraits={setTopTraits} />
                </Route>
                 <Route path='/Share/:id' children={<SharedPage columnData={columnData} setColumnData={setColumnData} />}/>
            </DragDropContext>
        </div>
    )
};

const AppWrapper = () => {
    return(
        <HashRouter basename={'/trait-ranker'}>
                <App/>
        </HashRouter>
    )
}


export default AppWrapper;
