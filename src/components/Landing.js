import React from "react";
import styled from "styled-components";

const Landing = ({onFormSubmit, formText, setFormText}) => {

    return(
        <div>
            <form onSubmit={onFormSubmit}>
                <div>
                    <input type="text" value={formText} onChange={event => setFormText(event.target.value)}/>
                </div>
            </form>
        </div>
        )
}

export default Landing
