import React, {useEffect, useMemo, useRef} from 'react';
import {useParams} from "react-router-dom";
import {getDBTraits} from "../utils/Firebase";

const SharedPage = () => {
    let {id}= useParams();
    const storedTraits = useRef([])
    useEffect(()=>{
        (async () => {
            storedTraits.current = await getDBTraits(id);
        })()
    },[id])
    console.log("storedTraits", storedTraits)
    return(
        <div>
            ID: {id}
            {storedTraits.current.map(trait =>{
                return <div>{trait}</div>
            })}
        </div>
    )
}
export default SharedPage
