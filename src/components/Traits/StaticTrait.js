import React from "react";
import '../../style/CardStacking.scss'



const StaticTrait = ({trait, onClick}) => {
    return (
        <div className='card' onClick={onClick}>
                <h1>
                    {trait}
                </h1>
        </div>
    )
};

export default StaticTrait;
