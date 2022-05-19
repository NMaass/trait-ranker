import React from "react";
import '../../style/CardStacking.scss'
import {traitIcons} from "../../Assets/listOfAllTraits";
import { IconContext } from "react-icons";
import {useMediaQuery} from "@mui/material";

const TraitCard = ({trait, provided}) => {
    const isMobile = useMediaQuery('(min-width:1024px')


    return (
        <div className='card selectionCard jumper' {...provided.dragHandleProps} draggable={true} id={trait}>
            <h1>
                {trait}
            </h1>
            <IconContext.Provider value={isMobile ? {size: '6vw'} : {size: '60vw'}}>
                {traitIcons[trait]}
            </IconContext.Provider>
        </div>
        )}
export default TraitCard
