import React from "react";
import StaticTrait from "./Traits/StaticTrait";
const Results = ({topTraits}) => {

    //might want this to be less wordy
    const listTraitsWithLineBreak = (traits) => {
        let htmlTraits = [];
        for (let trait in traits) {
            htmlTraits.push(<StaticTrait key={trait} trait={traits[trait]}/>)
            //perhaps want to assume traits.length is 10, seems more robust this way
            if(traits.indexOf(trait) === (Math.ceil(traits.length / 2))){
                htmlTraits.push(<br/>)
            }
        };
        return htmlTraits;
    }


    return(
        <div>
            <h3>
                Top Ten
            </h3>
            {listTraitsWithLineBreak(topTraits)}
            <p>
                Lorem ipsum dolar sit amet
            </p>
        </div>)
};

export default Results;
