import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getDBTraits} from "../utils/Firebase";

const SharedPage = () => {
    let {id}= useParams();
    const [storedTraits,setStoredTraits] = useState([]);
    useEffect(()=>{
        (async () => {
            await getDBTraits(id)
                .then(result => {
                    setStoredTraits(result)
                })
        })()
    },[id])
    console.log("storedTraits", storedTraits)
    return(
        <div>
            ID: {id}
            {storedTraits.map(trait =>{
                return <div key={trait}>{trait}</div>
            })}
        </div>
    )
}
export default SharedPage
