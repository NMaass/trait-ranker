import React from "react";
import '../../style/CardStyle.scss'
import {traitIcons} from "../../utils/listOfAllTraits";
import {Chip, useMediaQuery} from "@mui/material";

const ReorderTrait = ({trait, provided, color}) => {
    const isMobile = useMediaQuery('(min-width:1024px')

    return (
                <Chip
                    icon={traitIcons[trait]}
                    label={trait}
                    {...provided.dragHandleProps}
                    draggable={true}
                    id={trait}
                    color={color}
                    sx={isMobile ? {minWidth:'300px'} : {minWidth:'80vw'}}
                />
    )}
export default ReorderTrait
