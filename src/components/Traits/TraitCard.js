import React from "react";
import '../../style/CardStacking.scss'
import {traitIcons} from "../../Assets/listOfAllTraits";


const TraitCard = ({trait}) => {
    return (

        <div className='card'>
            <h1>
                {trait}
            </h1>
            <div className='icon'>
                {traitIcons[trait]}
             </div>
         </div>

    )
};

export default TraitCard;
