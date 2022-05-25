import React from "react";
import '../../style/CardStacking.scss'
import {traitIcons} from "../../Assets/listOfAllTraits";
import {IconContext} from "react-icons";
import {useMediaQuery} from "@mui/material";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";



const RankingTrait = ({trait, onClick}) => {
    const isMobile = useMediaQuery('(min-width:1024px')

    const rippleRef = React.useRef(null);
    const onRippleStart = (e) => {
        rippleRef.current.start(e);
    };
    const onRippleStop = (e) => {
        rippleRef.current.stop(e);
    };

    return (
            <div className='card rankCard' onClick={onClick} onMouseDown={onRippleStart} onMouseUp={onRippleStop}>
                <h1>
                    {trait}
                </h1>
            <IconContext.Provider value={isMobile ? {size: '6vw'} : {size: '20vw'}}>
                {traitIcons[trait]}
            </IconContext.Provider>
                <TouchRipple ref={rippleRef} center={false}/>
            </div>
    )
};

export default RankingTrait;
