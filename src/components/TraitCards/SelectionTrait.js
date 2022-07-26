import React from "react";
import '../../style/CardStyle.scss'
import {traitIcons} from "../../utils/listOfAllTraits";
import { IconContext } from "react-icons";
import {useMediaQuery} from "@mui/material";

const SelectionTrait = ({trait, provided}) => {
    const isMobile = useMediaQuery('(min-width:1024px')


    return (
        <div className='card selection' {...provided.dragHandleProps} draggable={true} id={trait}>
            <h1>
                {trait}
            </h1>
            <IconContext.Provider value={isMobile ? {size: '6vw'} : {size: '60vw'}}>
                {traitIcons[trait]}
            </IconContext.Provider>
        </div>
        )}
export default SelectionTrait
