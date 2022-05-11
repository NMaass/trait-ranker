import React from "react";
import '../../style/CardStacking.scss'
import {traitIcons} from "../../Assets/listOfAllTraits";
import {IconContext} from "react-icons";



const StaticTrait = ({trait, onClick}) => {
    return (
        <div className='card' onClick={onClick}>
                <h1>
                    {trait}
                </h1>
            <IconContext.Provider value={{size: '6vw'}}>
                {traitIcons[trait]}
            </IconContext.Provider>
        </div>
    )
};

export default StaticTrait;
