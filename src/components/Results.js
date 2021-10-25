import React from "react";

const Results = ({name, topTraits}) => {

    const listTraitsWithLineBreak = (traits) => {
        let htmlTraits = [];
        for (let traitsKey in traits) {
            htmlTraits.push(<h5 key={traitsKey}>{traits[traitsKey]}</h5>)

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
