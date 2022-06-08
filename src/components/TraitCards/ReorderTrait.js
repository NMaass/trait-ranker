import React from "react";
import '../../style/CardStyle.scss'
import {traitIcons} from "../../utils/listOfAllTraits";
import { IconContext } from "react-icons";
import {useMediaQuery} from "@mui/material";

const ReorderTrait = ({trait, provided}) => {
    const isMobile = useMediaQuery('(min-width:1024px')


    return (
        <div className='card reorder' {...provided.dragHandleProps} draggable={true} id={trait}>
            <p>
                {trait}
            </p>
            <IconContext.Provider value={isMobile ? {size: '2vw'} : {size: '3vw'}}>
                {traitIcons[trait]}
            </IconContext.Provider>
        </div>
    )}
export default ReorderTrait
