import React, {useEffect} from "react";
import Trait from "./Trait";
import styled from "styled-components";
import TraitCard from "./TraitCard";
import {Button} from "@mui/material";




const RankStack = ({ topTraits, setTopTraits, history}) => {
    const [displayedPairs, setDisplayedPairs] = React.useState(topTraits.slice(0,2));

    const [initialPairs, setInitialPairs] = React.useState([]);
    const [sortedPairs, setSortedPairs] = React.useState([]);
    const [sortingPair, setSortingPair] = React.useState([]);

    const [joinStack, setJoinStack] = React.useState([]);
    const [mergeStack, setMergeStack] = React.useState([]);

    const [leftGuess, setLeftGuess] = React.useState(0);
    const [rightGuess, setRightGuess] = React.useState(0);

    const [finishedList, setFinishedList] = React.useState([]);

    useEffect(() => {
        let newInitialPairs = []
        for (let i = 0; i < topTraits.length; i += 2){
            newInitialPairs.push([topTraits[i],topTraits[i+1]]);
        }
        setInitialPairs(newInitialPairs)

    },[])

    const handlePick = (pick) => {
        console.log("pick: " + pick)
        if (initialPairs.length !== 0){
            doInitialRound(pick);
        }
        if (sortedPairs.length !== 0 && mergeStack.length === 0 && initialPairs.length === 0){
            console.log("building round 2")
            buildJoinStack(sortedPairs[0])
            buildMergeStack(sortedPairs[0])
            setSortingPair(sortedPairs[0])
            setSortedPairs(sortedPairs.slice(2))
        }
        if(joinStack.length !== 0){
            doJoinRound(pick)
        }

        console.log("initialPairs: ", initialPairs)
        console.log("sortedPairs: ", sortedPairs)
        console.log("finished list: ", finishedList)
    }



    const doInitialRound = (pick) => {
        let _initialPairs = initialPairs;
        let _sortedPairs = sortedPairs;
        if(pick === _initialPairs[0][0]){
            _initialPairs[0] = _initialPairs[0].reverse();
            console.log("reversed ", _initialPairs[0])
        }

        _sortedPairs.push(_initialPairs.shift());

        setDisplayedPairs(_initialPairs[0]);
        if(initialPairs.length === 1){
            setFinishedList(_sortedPairs.shift());
            console.log("Time for round 2")
        }
        setInitialPairs(_initialPairs);
        setSortedPairs(_sortedPairs);
    }

    const doJoinRound = (pick) => {
        if(pick === sortingPair[0]){
            setFinishedList(finishedList.concat(sortingPair))
            clearStacks();
        }
        else if(pick === sortingPair[1]){
            setFinishedList(sortingPair.concat(finishedList))
            clearStacks();
        }
        let nextPair = joinStack.slice(1);
        if(nextPair){
            setJoinStack(nextPair);
            setDisplayedPairs(nextPair)
        }


    }

    const buildJoinStack = (list) =>{
        let _joinStack = [];

        _joinStack.push([list[0], finishedList[finishedList.length-1]]);
        _joinStack.push([list[1],finishedList[0]]);
        setJoinStack(_joinStack);
        setDisplayedPairs(_joinStack[0])
        console.log("Join stack: ", _joinStack)
    }

    const buildMergeStack = (list) => {
        let leftMergeStack = [];
        let rightMergeStack = [];

        for(let i = 0; i < finishedList.length; i++){
            leftMergeStack.push([list[0],finishedList[i]]);
        }
        for(let i = finishedList.length - 1; i >= 0; i--){
            rightMergeStack.push([list[1], finishedList[i]]);
        }
        setMergeStack([leftMergeStack, rightMergeStack]);
    }

    const clearStacks = () => {
        setJoinStack([]);
        setMergeStack([])
    }
    return (
        <div>
            <Button value={displayedPairs[0]} onClick={e => handlePick(e.target.value)}>{displayedPairs[0]}</Button>
            <Button value={displayedPairs[1]} onClick={e => handlePick(e.target.value)}>{displayedPairs[1]}</Button>
        </div>

    )
};

export default RankStack;


