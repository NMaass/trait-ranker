import React from "react";
import {Card} from '@mui/material';
import '../style/CardStacking.scss'



const TraitCard = ({trait}) => {
    return (
            <div className='card'>
                     <h1>
                         {trait}
                     </h1>

            </div>
    )
};

export default TraitCard;
