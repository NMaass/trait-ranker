import React from 'react';
import {useParams} from "react-router-dom";
import {getTraits} from "../utils/Firebase";

const SharedPage = () => {
    let {id}= useParams();
    const storedTraits = getTraits(id)
    console.log(storedTraits)
    return(
        <div>
            ID: {id}
        </div>
    )
}
export default SharedPage
