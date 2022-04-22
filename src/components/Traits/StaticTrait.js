import React from "react";
import '../../style/CardStacking.scss'



const StaticTrait = ({trait}) => {
    return (
        <div className='card'>
                <h1>
                    {trait}
                </h1>
        </div>
    )
};

export default StaticTrait;
