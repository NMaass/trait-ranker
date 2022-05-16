import React from "react";
import '../../style/CardStacking.scss'
import {traitIcons} from "../../Assets/listOfAllTraits";
import { IconContext } from "react-icons";
import {useMediaQuery} from "@mui/material";

const TraitCard = ({trait, provided}) => {
    const isMobile = useMediaQuery('(min-width:1024px')
    return (
        <div className='card' {...provided.dragHandleProps}>
            <h1>
                {trait}
            </h1>
            <IconContext.Provider value={isMobile ? {size: '6vw'} : {size: '70vw'} }>
                {traitIcons[trait]}
            </IconContext.Provider>
         </div>

    )
}

export default TraitCard;
