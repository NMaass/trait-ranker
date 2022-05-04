import React from "react";
import '../../style/CardStacking.scss'
import {traitIcons} from "../../Assets/listOfAllTraits";


const TraitCard = ({trait}) => {
    return (

        <div className='card'>
            <h1>
                {trait}
            </h1>
                {React.cloneElement(traitIcons[trait],{size: 60})}
         </div>

    )
};

export default TraitCard;
