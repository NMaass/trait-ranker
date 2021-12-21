import React from "react";

const Landing = ({onFormSubmit, formText, setFormText}) => {

    return(
        <div>
            <h1>
                Welcome to Trait Ranker
            </h1>
            <h3>
                This is a tool to help you understand the personality traits you value most. Since this is for your own personal use, they could be
                traits you see in yourself, others, or your interoperation of that that trait is.
            </h3>
            <form onSubmit={onFormSubmit}>
                <div>
                    <input type="text" value={formText} onChange={event => setFormText(event.target.value)}/>
                </div>
            </form>
        </div>
        )
}

export default Landing
