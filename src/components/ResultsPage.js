import React, {useEffect, useRef} from "react";
import makeId from "../utils/makeIdUtil"
import CopyableLink from "./CopyableLink";
import {setDBTraits} from "../utils/Firebase";
import SmallTraitList from "./SmallTraitList";


const ResultsPage = ({topTraits}) => {
    let hash = useRef(makeId(8));
    useEffect(()=>{
        (async () =>{
            console.log("setting traits", topTraits)
            await setDBTraits(hash.current, topTraits)
        })()
    },[topTraits])

    return(
        <div>
            <h3>
                Top Traits
            </h3>
            <SmallTraitList traits={topTraits.reverse()}/>
            <CopyableLink text={"localhost:3000/trait-ranker/Share/" +hash.current}/>
        </div>)
};

export default ResultsPage;
