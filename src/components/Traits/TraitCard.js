import React from "react";
import '../../style/CardStacking.scss'
import {traitIcons} from "../../Assets/listOfAllTraits";
import { IconContext } from "react-icons";
import {useMediaQuery} from "@mui/material";

const TraitCard = ({trait}) => {
    const isMobile = useMediaQuery('(min-width:1024px')
    return (
        <div className='card'>
            <h1>
                {trait}
            </h1>
            <IconContext.Provider value={isMobile ? {size: '6vw'} : {size: '80vw'} }>
                {traitIcons[trait]}
            </IconContext.Provider>
         </div>

    )
}

export default TraitCard;
