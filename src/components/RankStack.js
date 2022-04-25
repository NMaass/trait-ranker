import React, {useEffect, useRef} from "react";
import Trait from "./Traits/Trait";
import styled from "styled-components";
import TraitCard from "./Traits/TraitCard";
import {Button} from "@mui/material";
import StaticTrait from "./Traits/StaticTrait";




const RankStack = ({ topTraits, setTopTraits, history}) => {
    const [displayedPairs, setDisplayedPairs] = React.useState(topTraits.slice(0,2));

    let initialPairs = React.useRef([]);
    let sortedPairs = React.useRef([]);
    let sortingPair = React.useRef([]);

    let joinStack = React.useRef([]);
    let mergeStack = React.useRef([]);

    let leftGuess = React.useRef(0);
    let rightGuess = React.useRef(0);

    let finishedList = React.useRef([]);

    useEffect(() => {
        for (let i = 0; i < topTraits.length; i += 2){
            initialPairs.current.push([topTraits[i],topTraits[i+1]]);
        }
    },[])

    const handlePick = (pick) => {
        console.log("pick: " + pick)

        if(joinStack.current.length !== 0){
            doJoinRound(pick)
        }
        else if (mergeStack.current.length !== 0){
            doMergeRound(pick)
        }

        if (initialPairs.current.length !== 0){
            doInitialRound(pick);
        }

        let mergeStackHasValues = mergeStack.current.some(function (any) {return any.length});
        if (sortedPairs.current.length !== 0 && !mergeStackHasValues && initialPairs.current.length === 0){
            buildMerge(sortedPairs.current[0])
        }
        if (sortedPairs.current.length === 0 && !mergeStackHasValues){
            setTopTraits(finishedList.current);
            history.push('/Results')
        }

        console.log("initialPairs: ", initialPairs.current)
        console.log("sortedPairs: ", sortedPairs.current)
        console.log("finished list: ", finishedList.current)
        console.log("Join stack: ", joinStack.current)
        console.log("mergeStack", mergeStack.current)

    }



    const doInitialRound = (pick) => {

        if(pick === initialPairs.current[0][0]){
            initialPairs.current[0].reverse();
            console.log("reversed ", initialPairs.current[0])
        }

        sortedPairs.current.push(initialPairs.current.shift());

        setDisplayedPairs(initialPairs.current[0]);
        if(initialPairs.current.length === 1){
            finishedList.current = sortedPairs.current.shift();
            console.log("Prepping for round 2")
        }
    }

    const doJoinRound = (pick) => {
        if  (joinStack.current.length === 2){
            if(pick === sortingPair.current[0]){
                finishedList.current = finishedList.current.concat(sortingPair.current)
                clearStacks();
            }
            else {
                joinStack.current.shift();
                setDisplayedPairs(joinStack.current[0])
            }
        }
        else {
            if (pick === sortingPair.current[1]){
                joinStack.current = [];
                setDisplayedPairs(mergeStack.current[0][0])
            }
            else {
                finishedList.current = (sortingPair.current.concat(finishedList.current))
                clearStacks();
            }
        }
    }

    const doMergeRound = (pick) => {

        if(displayedPairs[0] === sortingPair.current[0]) {
            if (pick !== displayedPairs[0]) {
                finishedList.current.splice(leftGuess.current, 0, sortingPair.current[0]);
                mergeStack.current[0] = [];
            }
            else {
                mergeStack.current[0].shift();
                leftGuess.current++;
                console.log("leftGuess ", leftGuess.current);
                if(mergeStack.current[0].length === 0){
                    finishedList.current.splice(leftGuess.current, 0, sortingPair.current[0]);
                    mergeStack.current[0].shift();
                }
            }
            if(mergeStack.current[1].length !== 0){
                setDisplayedPairs(mergeStack.current[1][0]);
            }
            else {
                setDisplayedPairs(mergeStack.current[0][0]);
            }
        }
        else {
            if(pick === displayedPairs[0]){
                finishedList.current.splice(rightGuess.current, 0, sortingPair.current[1]);
                mergeStack.current[1] = []
            }
            else {
                mergeStack.current[1].shift();
                rightGuess.current--;
                console.log("rightGuess ", rightGuess.current);
                if(mergeStack.current[1].length === 0){
                    finishedList.current.splice(rightGuess.current, 0, sortingPair.current[1]);
                    mergeStack.current[1].shift();
                }
            }
            if(mergeStack.current[0].length !== 0){
                setDisplayedPairs(mergeStack.current[0][0]);
            }
            else {
                setDisplayedPairs(mergeStack.current[1][0])
            }
        }
    }

    const buildMerge = (list) => {
        console.log("building round 2")
        buildJoinStack(list);
        buildMergeStack(list);
        sortingPair.current = sortedPairs.current.shift();
        leftGuess.current = 0;
        rightGuess.current = finishedList.current.length;
    }

    const buildJoinStack = (list) =>{
        joinStack.current.push([list[0], finishedList.current[finishedList.current.length-1]]);
        joinStack.current.push([list[1],finishedList.current[0]]);
        setDisplayedPairs(joinStack.current[0])
        console.log("Initial Join stack: ", joinStack.current)
    }

    const buildMergeStack = (list) => {
        let leftMergeStack = [];
        let rightMergeStack = [];

        for(let i = 0; i < finishedList.current.length; i++){
            leftMergeStack.push([list[0],finishedList.current[i]]);
        }
        for(let i = finishedList.current.length - 1; i >= 0; i--){
            rightMergeStack.push([list[1], finishedList.current[i]]);
        }
        mergeStack.current = [leftMergeStack, rightMergeStack];
        console.log("initial mergeStack", mergeStack.current)
    }
    const clearStacks = () => {
        joinStack.current = [];
        mergeStack.current = [];
    }

    return (
        <div>
            <StaticTrait value={displayedPairs[0]} onClick={e => handlePick(e.target.value)} trait={displayedPairs[0]}/>
            <StaticTrait value={displayedPairs[1]} onClick={e => handlePick(e.target.value)} trait={displayedPairs[1]}/>
        </div>

    )
};

export default RankStack;


