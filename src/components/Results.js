import React from "react";
import TraitCard from "./TraitCard";
const Results = ({name, topTraits}) => {

    //might want this to be less wordy
    const listTraitsWithLineBreak = (traits) => {
        let htmlTraits = [];
        for (let traitsKey in traits) {
            htmlTraits.push(<TraitCard key={traitsKey} trait={traits[traitsKey]}/>)
            //perhaps want to assume traits.length is 10, seems more robust this way
            if(traits.indexOf(traitsKey) === (traits.length / 2)){
                htmlTraits.push(<br/>)
            }
        };
        return htmlTraits;
    }


    return(
        <div>
            <h1>
                {name}
            </h1>
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
