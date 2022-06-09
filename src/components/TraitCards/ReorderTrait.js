import React from "react";
import '../../style/CardStyle.scss'
import {traitIcons} from "../../utils/listOfAllTraits";
import { IconContext } from "react-icons";
import {useMediaQuery} from "@mui/material";

const ReorderTrait = ({trait, provided}) => {
    const isMobile = useMediaQuery('(min-width:1024px')


    return (
        <div className='card reorder' {...provided.dragHandleProps} draggable={true} id={trait}>
            <h3>
                {trait}
            </h3>
            <IconContext.Provider value={isMobile ? {size: '1vw'} : {size: '3vw'}}>
                {traitIcons[trait]}
            </IconContext.Provider>
        </div>
    )}
export default ReorderTrait
