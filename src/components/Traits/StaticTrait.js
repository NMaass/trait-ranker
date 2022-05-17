import React from "react";
import '../../style/CardStacking.scss'
import {traitIcons} from "../../Assets/listOfAllTraits";
import {IconContext} from "react-icons";
import {useMediaQuery} from "@mui/material";



const StaticTrait = ({trait, onClick}) => {
    const isMobile = useMediaQuery('(min-width:1024px')
    return (
        <div className='card rankCard' onClick={onClick}>
                <h1>
                    {trait}
                </h1>
            <IconContext.Provider value={isMobile ? {size: '6vw'} : {size: '20vw'}}>
                {traitIcons[trait]}
            </IconContext.Provider>
        </div>
    )
};

export default StaticTrait;
