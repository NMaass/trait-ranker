import React from "react";
import '../../style/CardStacking.scss'
import {traitIcons} from "../../Assets/listOfAllTraits";
import { IconContext } from "react-icons";

const TraitCard = ({trait}) => {
    return (
        <div className='card'>
            <h1>
                {trait}
            </h1>
            <IconContext.Provider value={{size: '6vw'}}>
                {traitIcons[trait]}
            </IconContext.Provider>
         </div>

    )
}

export default TraitCard;
