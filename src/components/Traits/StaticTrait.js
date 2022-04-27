import React from "react";
import '../../style/CardStacking.scss'
import {traitIcons} from "../../Assets/listOfAllTraits";



const StaticTrait = ({trait, onClick}) => {
    return (
        <div className='card' onClick={onClick}>
                <h1>
                    {trait}
                </h1>
            {React.cloneElement(traitIcons[trait],{size: 60})}
        </div>
    )
};

export default StaticTrait;
